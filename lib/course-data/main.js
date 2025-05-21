#!/usr/bin/env node

const { MongoClient, ObjectId } = require('mongodb'); // ObjectId might be needed if you generate _ids manually
const fs = require('fs').promises; // Use promises API for fs
const path = require('path');

// --- Configuration ---
const MONGO_CONNECTION_STRING = "mongodb+srv://zkariaelkhaldi:BKKiqDJ8gbKJ7FtY@cluster0.oeofczf.mongodb.net/?retryWrites=true&w=majority&appName=W3SchoolsImporterJS";
// Make sure to replace <yourDB> if you want to specify a default DB in the string,
// or it will connect to the 'admin' or 'test' db by default.
// The db name is specified later anyway.
// const MONGO_CONNECTION_STRING = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@your_cluster_url/...`; // For env vars

const MONGO_DB_NAME = "w3schools_cleaned_db_js"; // Or your preferred DB name
const TUTORIALS_COLLECTION_NAME = "tutorials";
const CATEGORIES_COLLECTION_NAME = "course_categories";
const CLEANED_DATA_ROOT_DIR = "."; // Path to your cleaned output directory

// --- Logging ---
const logger = {
    info: (message) => console.log(`[INFO] ${new Date().toISOString()} - ${message}`),
    warn: (message) => console.warn(`[WARN] ${new Date().toISOString()} - ${message}`),
    error: (message) => console.error(`[ERROR] ${new Date().toISOString()} - ${message}`),
    debug: (message) => console.log(`[DEBUG] ${new Date().toISOString()} - ${message}`), // Change to console.debug for less verbosity
};

async function connectToMongo() {
    const client = new MongoClient(MONGO_CONNECTION_STRING);
    try {
        await client.connect();
        logger.info("Successfully connected to MongoDB Atlas.");
        return client;
    } catch (err) {
        logger.error(`Could not connect to MongoDB: ${err}`);
        throw err;
    }
}

async function importTutorial(db, tutorialData, categorySlug, subcategorySlug) {
    const tutorialsCollection = db.collection(TUTORIALS_COLLECTION_NAME);
    const documentId = tutorialData.id; // Assuming 'id' is the UUID string from your JSON

    if (!documentId) {
        logger.warn(`Tutorial data missing 'id' field. Skipping: ${tutorialData.title || 'Unknown title'}`);
        return false;
    }

    // MongoDB uses _id. We'll set it to the value of 'id' from your JSON.
    const documentToInsert = { ...tutorialData, _id: documentId };
    // delete documentToInsert.id; // Optionally remove the original 'id' field if _id is sufficient

    try {
        const result = await tutorialsCollection.updateOne(
            { _id: documentId },
            { $set: documentToInsert },
            { upsert: true }
        );

        if (result.upsertedId) {
            logger.info(`Inserted new tutorial: ${tutorialData.title} (ID: ${documentId})`);
        } else if (result.matchedCount) {
            logger.info(`Updated existing tutorial: ${tutorialData.title} (ID: ${documentId})`);
        }
        return true;
    } catch (err) {
        logger.error(`Error importing tutorial ${tutorialData.title}: ${err}`);
        return false;
    }
}

async function importCategorySummary(db, categorySlug, coursesJsonPath) {
    const categoriesCollection = db.collection(CATEGORIES_COLLECTION_NAME);
    try {
        const fileContent = await fs.readFile(coursesJsonPath, 'utf-8');
        const categorySummaryData = JSON.parse(fileContent);

        const documentId = categorySlug; // Use category directory name as _id
        const documentToInsert = { ...categorySummaryData, _id: documentId };

        const result = await categoriesCollection.updateOne(
            { _id: documentId },
            { $set: documentToInsert },
            { upsert: true }
        );

        if (result.upsertedId) {
            logger.info(`Inserted new category summary: ${categorySlug}`);
        } else if (result.matchedCount) {
            logger.info(`Updated existing category summary: ${categorySlug}`);
        }
        return true;
    } catch (err) {
        if (err.code === 'ENOENT') {
            logger.warn(`courses.json not found for category ${categorySlug} at ${coursesJsonPath}`);
        } else if (err instanceof SyntaxError) {
            logger.error(`Error decoding courses.json for ${categorySlug}: ${err}`);
        } else {
            logger.error(`Error importing category summary for ${categorySlug}: ${err}`);
        }
        return false;
    }
}

async function main() {
    let client;
    try {
        client = await connectToMongo();
        const db = client.db(MONGO_DB_NAME);
        const rootInputDir = path.resolve(CLEANED_DATA_ROOT_DIR);

        if (! (await fs.stat(rootInputDir)).isDirectory()) {
            logger.error(`Input directory '${CLEANED_DATA_ROOT_DIR}' not found or not a directory.`);
            return;
        }

        let tutorialsImportedCount = 0;
        let tutorialsFailedCount = 0;
        let categoriesProcessedCount = 0;

        logger.info(`Starting import from: ${rootInputDir}`);

        const categoryDirs = await fs.readdir(rootInputDir);

        for (const categoryDirName of categoryDirs) {
            const categoryPath = path.join(rootInputDir, categoryDirName);
            const statCategory = await fs.stat(categoryPath);

            if (!statCategory.isDirectory()) {
                if (categoryDirName === "processing_stats.json") {
                    logger.info(`Skipping global file: ${categoryDirName}`);
                } else {
                    logger.warn(`Skipping non-directory item in root: ${categoryDirName}`);
                }
                continue;
            }

            const categorySlug = categoryDirName;
            logger.info(`Processing category: ${categorySlug}`);
            categoriesProcessedCount++;

            const coursesJsonFile = path.join(categoryPath, "courses.json");
            try {
                await fs.access(coursesJsonFile); // Check if file exists
                await importCategorySummary(db, categorySlug, coursesJsonFile);
            } catch (err) { // fs.access throws if not found
                 logger.warn(`No courses.json found in category directory: ${categoryPath}`);
            }


            const subCategoryDirs = await fs.readdir(categoryPath);
            for (const subCategoryDirName of subCategoryDirs) {
                const subCategoryPath = path.join(categoryPath, subCategoryDirName);
                const statSubCategory = await fs.stat(subCategoryPath);

                if (!statSubCategory.isDirectory()) {
                    // Skip files like courses.json at this level
                    continue;
                }

                const subcategorySlug = subCategoryDirName;
                logger.info(`  Processing subcategory: ${subcategorySlug}`);

                const tutorialFiles = (await fs.readdir(subCategoryPath)).filter(f => f.endsWith('.json'));
                for (const tutorialFileName of tutorialFiles) {
                    const tutorialFilePath = path.join(subCategoryPath, tutorialFileName);
                    logger.debug(`    Found tutorial file: ${tutorialFileName}`);
                    try {
                        const fileContent = await fs.readFile(tutorialFilePath, 'utf-8');
                        const tutorialData = JSON.parse(fileContent);

                        if (await importTutorial(db, tutorialData, categorySlug, subcategorySlug)) {
                            tutorialsImportedCount++;
                        } else {
                            tutorialsFailedCount++;
                        }
                    } catch (err) {
                        if (err instanceof SyntaxError) {
                            logger.error(`Error decoding JSON from ${tutorialFileName}: ${err}`);
                        } else {
                            logger.error(`Unexpected error processing ${tutorialFileName}: ${err}`);
                        }
                        tutorialsFailedCount++;
                    }
                }
            }
        }

        logger.info("--- Import Summary ---");
        logger.info(`Categories processed: ${categoriesProcessedCount}`);
        logger.info(`Tutorials successfully imported/updated: ${tutorialsImportedCount}`);
        logger.info(`Tutorials failed to import: ${tutorialsFailedCount}`);

    } catch (err) {
        logger.error(`An critical error occurred: ${err}`);
    } finally {
        if (client) {
            await client.close();
            logger.info("MongoDB connection closed.");
        }
    }
}

main().catch(err => logger.error("Unhandled error in main execution:", err));

// After running, you might want to create indexes in MongoDB for better query performance.
// Example mongo shell commands:
// use w3schools_cleaned_db_js; // or your MONGO_DB_NAME
// db.tutorials.createIndex({ "slug": 1 }, { unique: true });
// db.tutorials.createIndex({ "metadata.category": 1 });
// db.tutorials.createIndex({ "metadata.subcategory": 1 });
// db.tutorials.createIndex({ "metadata.keywords": 1 });
// db.course_categories.createIndex({ "category": 1 }); // If you store 'category' field
// db.course_categories.createIndex({ "_id": 1 }); // _id is already indexed, but good to be aware