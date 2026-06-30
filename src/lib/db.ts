// MongoDB client for direct database access
import { MongoClient, MongoServerSelectionError, MongoNetworkError } from "mongodb";
import "dotenv/config";

const uri = process.env.DATABASE_URL || "mongodb+srv://adarsh_db:Vicky%23250706@cluster0.bbpaq8k.mongodb.net/propertyhub?retryWrites=true&w=majority";

declare global {
  var mongoClientGlobal: MongoClient | undefined;
}

const client = global.mongoClientGlobal ?? new MongoClient(uri, {
  retryReads: true,
  retryWrites: true,
  connectTimeoutMS: 10000,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 30000,
  maxPoolSize: 10,
});

global.mongoClientGlobal = client;

export { client };

export const db = client.db("propertyhub");

export async function withDbRetry<T>(operation: () => Promise<T>, retries = 2): Promise<T> {
  for (let i = 0; i <= retries; i++) {
    try {
      return await operation();
    } catch (error) {
      const isRetryable =
        error instanceof MongoServerSelectionError ||
        error instanceof MongoNetworkError;

      if (!isRetryable || i === retries) {
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  throw new Error("Unreachable retry limit");
}