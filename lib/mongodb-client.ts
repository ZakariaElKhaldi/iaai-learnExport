import { MongoClient, ServerApiVersion } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || 'w3schools_cleaned_db_js';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  clientPromise = client.connect();
}

export default clientPromise;

// Helper function to get database instance
export async function getDatabase() {
  const client = await clientPromise;
  return client.db(dbName);
}

// Helper function to get a collection
export async function getCollection(collectionName: string) {
  const db = await getDatabase();
  return db.collection(collectionName);
}

// Types for our collections based on the schema
export interface Tutorial {
  _id: string;
  content_sections: Array<{
    type: string;
    title: string;
    content: string;
    order: number;
    code: null;
    language: null;
    explanation: null;
  }>;
  id: string;
  metadata: {
    description: string;
    keywords: string[];
    difficulty: string;
    prerequisites: string[];
    estimated_time: number;
    category: string;
    subcategory: string;
  };
  practice_exercises: Array<{
    title: string;
    description: string;
    difficulty: string;
    starter_code: string;
    solution: string;
  }>;
  quiz: Array<{
    question: string;
    options: string[];
    correct_answer: number;
    explanation: string;
  }>;
  related_topics: Array<{
    id: string;
    title: string;
    relationship: string;
  }>;
  slug: string;
  summary: string;
  title: string;
}

export interface CourseCategory {
  _id: string;
  category: string;
  courses: Array<{
    id: string;
    title: string;
    slug: string;
    category: string;
    subcategory: string;
    path: string;
    difficulty: string;
    estimated_time: number;
  }>;
  courses_count: number;
  timestamp: number;
}
