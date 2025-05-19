import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import fs from 'fs';

// Load environment variables
dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || 'w3schools_cleaned_db_js';

if (!uri) {
  console.error('❌ Error: MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

const client = new MongoClient(uri);

async function analyzeSchema() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await client.connect();
    const db = client.db(dbName);
    console.log(`✅ Successfully connected to database: ${dbName}`);

    // Get all collections
    const collections = await db.listCollections().toArray();
    console.log(`\nFound ${collections.length} collections:`);
    collections.forEach(collection => {
      console.log(`- ${collection.name}`);
    });

    // Analyze course_categories collection
    console.log('\n1. Analyzing course_categories collection...');
    const categoriesCollection = db.collection('course_categories');
    const categoriesCount = await categoriesCollection.countDocuments();
    console.log(`Total categories: ${categoriesCount}`);

    // Get a sample category
    const sampleCategory = await categoriesCollection.findOne({});
    console.log('\nSample category structure:');
    console.log(JSON.stringify(sampleCategory, null, 2));

    // Get all unique category names
    const categories = await categoriesCollection.distinct('category');
    console.log(`\nUnique category names (${categories.length}):`);
    console.log(categories);

    // Count courses per category
    console.log('\nCourses per category:');
    const categoryStats = await categoriesCollection.aggregate([
      { $project: { category: 1, coursesCount: { $size: { $ifNull: ['$courses', []] } } } },
      { $sort: { coursesCount: -1 } }
    ]).toArray();
    
    categoryStats.forEach(cat => {
      console.log(`- ${cat.category}: ${cat.coursesCount} courses`);
    });

    // Analyze tutorials collection
    console.log('\n2. Analyzing tutorials collection...');
    const tutorialsCollection = db.collection('tutorials');
    const tutorialsCount = await tutorialsCollection.countDocuments();
    console.log(`Total tutorials: ${tutorialsCount}`);

    // Get a sample tutorial
    const sampleTutorial = await tutorialsCollection.findOne({});
    console.log('\nSample tutorial structure:');
    console.log(JSON.stringify({
      id: sampleTutorial.id,
      slug: sampleTutorial.slug,
      title: sampleTutorial.title,
      summary: sampleTutorial.summary,
      metadata: sampleTutorial.metadata,
      content_sections_count: sampleTutorial.content_sections?.length || 0,
      practice_exercises_count: sampleTutorial.practice_exercises?.length || 0,
      quiz_count: sampleTutorial.quiz?.length || 0
    }, null, 2));

    // Get all unique categories in tutorials
    const tutorialCategories = await tutorialsCollection.distinct('metadata.category');
    console.log(`\nUnique tutorial categories (${tutorialCategories.length}):`);
    console.log(tutorialCategories);

    // Get all unique subcategories in tutorials
    const tutorialSubcategories = await tutorialsCollection.distinct('metadata.subcategory');
    console.log(`\nUnique tutorial subcategories (${tutorialSubcategories.length}):`);
    console.log(tutorialSubcategories);

    // Count tutorials per category
    console.log('\nTutorials per category:');
    const tutorialCategoryStats = await tutorialsCollection.aggregate([
      { $group: { _id: '$metadata.category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]).toArray();
    
    tutorialCategoryStats.forEach(cat => {
      console.log(`- ${cat._id || 'Uncategorized'}: ${cat.count} tutorials`);
    });

    // Analyze title patterns to identify main topics
    console.log('\n3. Analyzing title patterns to identify main topics...');
    
    // Extract main topics from titles
    const titlePatterns = await tutorialsCollection.aggregate([
      { 
        $project: { 
          title: 1,
          mainTopic: { 
            $regexFind: { 
              input: '$title', 
              regex: /^([A-Za-z0-9]+)/ 
            } 
          }
        }
      },
      {
        $group: {
          _id: { $ifNull: ['$mainTopic.match', 'Other'] },
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]).toArray();
    
    console.log('Main topics extracted from titles:');
    titlePatterns.forEach(pattern => {
      console.log(`- ${pattern._id}: ${pattern.count} tutorials`);
    });

    // Save analysis to a file
    const analysis = {
      collections,
      categoryStats,
      tutorialCategoryStats,
      titlePatterns,
      categories,
      tutorialCategories,
      tutorialSubcategories
    };
    
    fs.writeFileSync('./db-analysis.json', JSON.stringify(analysis, null, 2));
    console.log('\n✅ Analysis saved to db-analysis.json');

  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await client.close();
    console.log('\nDatabase connection closed.');
  }
}

analyzeSchema();
