// MongoDB client for direct database access
import { MongoClient } from "mongodb";
import "dotenv/config";

declare global {
  var mongoClientGlobal: MongoClient | undefined;
}

const uri = process.env.DATABASE_URL || "mongodb+srv://adarsh_db:Vicky%23250706@cluster0.bbpaq8k.mongodb.net/propertyhub?retryWrites=true&w=majority&appName=Cluster0";

// Lazy initialization for MongoDB client
let clientInstance: MongoClient;

export function getMongoClient(): MongoClient {
  if (!clientInstance) {
    clientInstance = new MongoClient(uri, {
      connectTimeoutMS: 30000,
    });
  }
  return clientInstance;
}

export const client = getMongoClient();
export const db = client.db("propertyhub");