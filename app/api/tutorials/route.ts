import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb-client';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || 'w3schools_cleaned_db_js';

if (!uri) {
  throw new Error('Please add your Mongo URI to .env');
}

export async function GET(request: Request) {
  const client = new MongoClient(uri as string);
  
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const slug = searchParams.get('slug') || undefined;
    const mainTopic = searchParams.get('topic') || undefined;
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam) : 20;
    
    await client.connect();
    const db = client.db(dbName);
    const tutorialsCollection = db.collection('tutorials');
    
    const filter: any = {};
    if (category) {
      filter['metadata.category'] = category;
    }
    
    if (slug) {
      filter['slug'] = slug;
    }
    
    if (mainTopic) {
      // Extract main topic from title (first word)
      filter['title'] = { $regex: new RegExp(`^${mainTopic}`, 'i') };
    }
    
    const tutorials = await tutorialsCollection
      .find(filter)
      .limit(limit)
      .toArray();
    
    // If fetching a specific tutorial by slug, return just that tutorial
    if (slug && tutorials.length === 1) {
      return NextResponse.json(tutorials[0]);
    }
    
    return NextResponse.json(tutorials);
  } catch (error) {
    console.error('Database error:', error);
    
    // Fallback to cached data if available and looking for a specific tutorial
    try {
      const { searchParams } = new URL(request.url);
      const slug = searchParams.get('slug');
      
      if (slug) {
        const fs = require('fs');
        const path = require('path');
        const cachedDataPath = path.join(process.cwd(), 'public', 'sample-tutorial.json');
        
        if (fs.existsSync(cachedDataPath)) {
          const cachedTutorial = JSON.parse(fs.readFileSync(cachedDataPath, 'utf8'));
          if (cachedTutorial.slug === slug) {
            console.log('Using cached tutorial data');
            return NextResponse.json(cachedTutorial);
          }
        }
      }
    } catch (cacheError) {
      console.error('Cache fallback error:', cacheError);
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch tutorials' },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
