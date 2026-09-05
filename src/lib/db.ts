// MongoDB client for direct database access
import { MongoClient, MongoServerSelectionError, MongoNetworkError, MongoClientOptions } from "mongodb";
import "dotenv/config";

const uri = process.env.DATABASE_URL ?? "";

if (!uri) {
  // Non-fatal: allows module import during build/SSG when DATABASE_URL
  // isn't available in the build environment. Connection is lazy — the
  // MongoDB driver only connects when a query runs at runtime, where the
  // try-catch blocks in pages/API routes will handle the failure gracefully.
  console.warn("DATABASE_URL environment variable is not defined. Database features will be unavailable.");
}

// ⚡ The MongoDB driver validates the URI at construction time and throws
// MongoParseError for invalid schemes (including empty string). We use a
// valid placeholder URI so the MongoClient can be constructed during build.
// At runtime (Vercel Serverless Functions), DATABASE_URL is set in the
// project env and this module is re-evaluated per-process with the real URI.
const isBuildPlaceholder = !uri;
const connectUri = uri || "mongodb://localhost:27017/__build_placeholder__";

// Shorter timeouts for placeholder connections (build-time only) to avoid
// 60s stalls when DATABASE_URL is unset. Real connections use production timeouts.
const clientOptions: MongoClientOptions = {
  retryReads: true,
  retryWrites: true,
  connectTimeoutMS: isBuildPlaceholder ? 2000 : 60000,
  serverSelectionTimeoutMS: isBuildPlaceholder ? 2000 : 60000,
  socketTimeoutMS: isBuildPlaceholder ? 2000 : 60000,
  maxPoolSize: 10,
};
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
    global.mongoClientGlobal = new MongoClient(connectUri, clientOptions);
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
  client = new MongoClient(connectUri, clientOptions);
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