// MongoDB client for direct database access
import { MongoClient, MongoServerSelectionError, MongoNetworkError } from "mongodb";
import "dotenv/config";

const uri = process.env.DATABASE_URL ?? "";

if (!uri) {
  throw new Error("DATABASE_URL environment variable is not defined");
}
// Extend global scope safely in Next.js environment context
declare global {
  var mongoClientGlobal: MongoClient | undefined;
  var mongoClientPromiseGlobal: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient> | undefined;

if (process.env.NODE_ENV === "development") {
  // Global context evaluation to prevent HMR connection spikes
  if (!global.mongoClientGlobal) {
    global.mongoClientGlobal = new MongoClient(uri, {
      retryReads: true,
      retryWrites: true,
      connectTimeoutMS: 60000,
      serverSelectionTimeoutMS: 60000,
      socketTimeoutMS: 60000,
      maxPoolSize: 10,
    });
  }
  client = global.mongoClientGlobal;

  if (!global.mongoClientPromiseGlobal) {
    global.mongoClientPromiseGlobal = client.connect();
  }
  clientPromise = global.mongoClientPromiseGlobal;
} else {
  // Deployed production environment instances
  // ⚡ Connection is lazy — MongoDB driver auto-connects on first query.
  // This prevents DNS/connection errors during `next build` (SSG imports modules at build time).
  client = new MongoClient(uri, {
    retryReads: true,
    retryWrites: true,
    connectTimeoutMS: 60000,
    serverSelectionTimeoutMS: 60000,
    socketTimeoutMS: 60000,
    maxPoolSize: 10,
  });
}

// 🔥 EXPORT CLIENT: purani integration loops ko support karne ke liye reference
export { client };

// 🚀 DYNAMIC DB RESOLVER ENGINE: Isko call karne se connection kabhi closed state me nahi milega
export async function getDatabase() {
  if (!clientPromise) {
    clientPromise = client.connect();
  }
  const activeClient = await clientPromise;
  return activeClient.db("propertyhub"); // Explicitly returns healthy connection channel
}

/**
 * Enhanced Database Retry Resilience Engine
 */
export async function withDbRetry<T>(operation: () => Promise<T>, retries = 3): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < retries; i++) {
    try {
      return await operation();
    } catch (error: unknown) {
      lastError = error;
      
      // Checking for all retryable infrastructure errors (including closed topology instances)
      const isRetryable =
        error instanceof MongoServerSelectionError ||
        error instanceof MongoNetworkError ||
        (error instanceof Error && (
          error.message?.includes("Topology is closed") ||
          error.name?.includes("MongoTopologyClosedError")
        ));

      if (!isRetryable || i === retries - 1) {
        throw error;
      }

      console.warn(`[DB RETRY] Operation failed (Attempt ${i + 1}/${retries}). Retrying in ${1000 * (i + 1)}ms. Error: ${(error as Error)?.message}`);
      
      // Exponential backoff buffer sleep logic
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  throw lastError;
}