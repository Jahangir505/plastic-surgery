// utils/db.js
import { MongoClient } from "mongodb";

const { MONGO_URL, MONGODB_DB } = process.env;

if (!MONGO_URL || !MONGODB_DB) {
  throw new Error(
    "Please define MONGODB_URI and MONGODB_DB in your .env.local file"
  );
}

let cachedClient;
let cachedDb;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = client.db(MONGODB_DB);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
