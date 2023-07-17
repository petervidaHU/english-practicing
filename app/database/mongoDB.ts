const { MongoClient, ServerApiVersion, Db, Collection } = require('mongodb');

const uri = process.env.MONGOCONNECT;
const dbName = process.env.MONGODATABASENAME;
const mindTheGapTable = process.env.COLLECTION_MINDTHEGAP;
let db: typeof Db;
let collection: typeof Collection;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function connectToDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    db = client.db(dbName);
    collection = db.collection(mindTheGapTable);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
}

export function getDB(): typeof Db {
  return db;
}

export function getCollection(): typeof Collection {
  return collection;
}

export async function closeDBConnection() {
  await client.close();
  console.log('Closed MongoDB Atlas connection');
}