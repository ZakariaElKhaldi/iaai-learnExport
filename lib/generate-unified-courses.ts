#!/usr/bin/env node

import { promises as fs } from 'fs';
import path from 'path';
import { generateUnifiedCoursesData } from './course-utils.js';

async function main() {
  try {
    console.log('Generating unified_courses.json...');
    
    // Generate the unified courses data
    const unifiedData = await generateUnifiedCoursesData();
    
    // Write the data to unified_courses.json
    const outputPath = path.join(process.cwd(), 'lib', 'course-data', 'unified_courses.json');
    await fs.writeFile(outputPath, JSON.stringify(unifiedData, null, 2), 'utf8');
    
    console.log(`Successfully generated unified_courses.json with ${unifiedData.total_courses} courses in ${unifiedData.total_categories} categories.`);
  } catch (error) {
    console.error('Error generating unified_courses.json:', error);
    process.exit(1);
  }
}

main(); 