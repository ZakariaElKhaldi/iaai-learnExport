# MongoDB Schema Analyzer

This tool helps you analyze your MongoDB database schema safely without sharing credentials.

## Setup

1. Install Node.js if you don't have it already
2. Run `npm install mongodb dotenv` to install dependencies
3. Create a `.env` file based on the provided `.env.example`:
   ```
   cp .env.example .env
   ```
4. Edit the `.env` file with your MongoDB connection details

## Usage

```
node schema-analyzer.js
```

## What it does

- Lists all collections in your database
- Shows document count for each collection
- Analyzes and displays the schema structure
- Shows field types distribution
- Lists indexes for each collection

## Security Notes

- NEVER commit your `.env` file to version control
- Credentials are only stored locally on your machine
- This script only reads from your database, it does not modify any data