import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb-client';

export async function GET() {
  try {
    const courseCategoriesCollection = await getCollection('course_categories');
    const categories = await courseCategoriesCollection.find({}).toArray();

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch course categories' },
      { status: 500 }
    );
  }
}
