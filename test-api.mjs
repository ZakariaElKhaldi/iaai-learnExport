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

// Helper function to assign colors to categories
function getColorForCategory(category) {
  const colors = {
    'HTML': '#E44D26',
    'CSS': '#264DE4',
    'JavaScript': '#F7DF1E',
    'Python': '#3776AB',
    'SQL': '#00758F',
    'Java': '#007396',
    'React': '#61DAFB',
    'TypeScript': '#3178C6',
    'Node.js': '#339933',
    'MongoDB': '#47A248',
    'Git': '#F05032',
    'Docker': '#2496ED',
    'AWS': '#FF9900',
    'Linux': '#FCC624',
    'PHP': '#777BB4',
    'C#': '#239120',
    'Ruby': '#CC342D',
    'Go': '#00ADD8',
    'Swift': '#FA7343',
    'Kotlin': '#7F52FF',
    'Rust': '#000000',
    'Vue.js': '#4FC08D',
    'Angular': '#DD0031',
    'Django': '#092E20',
    'Laravel': '#FF2D20',
    'Spring': '#6DB33F',
    'Flutter': '#02569B',
    'Kubernetes': '#326CE5',
    'GraphQL': '#E10098',
    'Accessibility': '#006600'
  };

  return colors[category] || '#4CAF50'; // Default color if category not found
}

// Helper function to assign icons to categories
function getIconForCategory(category) {
  const categoryToIcon = {
    'HTML': 'Code',
    'CSS': 'PenTool',
    'JavaScript': 'Code',
    'Python': 'Code',
    'SQL': 'Database',
    'Java': 'Code',
    'React': 'Layers',
    'TypeScript': 'Code',
    'Node.js': 'Server',
    'MongoDB': 'Database',
    'Git': 'GitBranch',
    'Docker': 'Box',
    'AWS': 'Cloud',
    'Linux': 'Terminal',
    'Accessibility': 'Eye'
  };

  return categoryToIcon[category] || 'Code'; // Default to Code icon if not found
}

async function run() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await client.connect();
    const db = client.db(dbName);
    console.log('✅ Successfully connected to MongoDB!');

    // 1. Fetch categories with their courses
    console.log('\n1. Fetching course categories...');
    const categoriesCollection = db.collection('course_categories');
    const categories = await categoriesCollection
      .find({})
      .sort({ category: 1 })
      .toArray();
    
    console.log(`✅ Found ${categories.length} categories`);
    
    // 2. Transform the data to match our frontend structure
    console.log('\n2. Transforming data for frontend...');
    const transformedCategories = categories.map(cat => ({
      id: cat.category.toLowerCase().replace(/\s+/g, '-'),
      name: cat.category,
      color: getColorForCategory(cat.category),
      tutorials: cat.courses ? cat.courses.map(course => ({
        id: course.slug,
        name: course.title,
        icon: getIconForCategory(course.category),
        description: `${course.title} tutorial and exercises`,
        level: course.difficulty.toLowerCase(),
        popular: course.category === cat.category // Mark main category tutorials as popular
      })) : []
    }));
    
    console.log(`✅ Transformed ${transformedCategories.length} categories`);
    
    // 3. Save the transformed data to a JSON file
    console.log('\n3. Saving data to JSON file...');
    fs.writeFileSync('./public/categories-data.json', JSON.stringify(transformedCategories, null, 2));
    console.log('✅ Data saved to public/categories-data.json');
    
    // 4. Fetch a sample tutorial to see its structure
    console.log('\n4. Fetching a sample tutorial...');
    const tutorialsCollection = db.collection('tutorials');
    const sampleTutorial = await tutorialsCollection.findOne({});
    
    if (sampleTutorial) {
      console.log('✅ Sample tutorial structure:');
      console.log(JSON.stringify({
        id: sampleTutorial.id,
        slug: sampleTutorial.slug,
        title: sampleTutorial.title,
        summary: sampleTutorial.summary,
        metadata: sampleTutorial.metadata,
        // Only showing the count of content sections and exercises for brevity
        content_sections_count: sampleTutorial.content_sections?.length || 0,
        practice_exercises_count: sampleTutorial.practice_exercises?.length || 0,
        quiz_count: sampleTutorial.quiz?.length || 0
      }, null, 2));
      
      // Save a sample tutorial to a JSON file
      fs.writeFileSync('./public/sample-tutorial.json', JSON.stringify(sampleTutorial, null, 2));
      console.log('✅ Sample tutorial saved to public/sample-tutorial.json');
    } else {
      console.log('❌ No tutorials found');
    }

    console.log('\n✅ All tests completed successfully!');
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  } finally {
    await client.close();
    console.log('\nDatabase connection closed.');
  }
}

run();
