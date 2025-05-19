require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || 'w3schools_cleaned_db_js';

console.log('Starting database connection test...');
console.log('Database Name:', dbName);

if (!uri) {
    console.error('❌ Error: MONGODB_URI is not defined in environment variables');
    process.exit(1);
}

const client = new MongoClient(uri);

async function run() {
    try {
        console.log('\n1. Testing connection...');
        await client.connect();
        const db = client.db(dbName);
        await db.command({ ping: 1 });
        console.log('✅ Successfully connected to MongoDB!');

        // Test Categories Collection
        console.log('\n2. Testing course_categories collection...');
        const categoriesCollection = db.collection('course_categories');
        const categoriesCount = await categoriesCollection.countDocuments();
        const sampleCategory = await categoriesCollection.findOne({});
        console.log(`✅ Found ${categoriesCount} categories`);
        console.log('Sample category:', {
            category: sampleCategory?.category,
            coursesCount: sampleCategory?.courses_count
        });

        // Test Tutorials Collection
        console.log('\n3. Testing tutorials collection...');
        const tutorialsCollection = db.collection('tutorials');
        const tutorialsCount = await tutorialsCollection.countDocuments();
        const sampleTutorial = await tutorialsCollection.findOne({});
        console.log(`✅ Found ${tutorialsCount} tutorials`);
        console.log('Sample tutorial:', {
            title: sampleTutorial?.title,
            category: sampleTutorial?.metadata?.category,
            difficulty: sampleTutorial?.metadata?.difficulty
        });

        console.log('\n✅ All tests completed successfully!');
    } catch (err) {
        console.error('❌ Error:', err);
        process.exit(1);
    } finally {
        await client.close();
        console.log('\nDatabase connection closed.');
        process.exit(0);
    }
}

run();
