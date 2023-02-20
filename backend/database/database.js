import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

async function connectDatabase(){
    const mongod = await MongoMemoryServer.create()
    const getUri = mongod.getUri()
    mongoose.set('strictQuery', true)
    const db = await mongoose.connect(getUri)
    console.log('====================================');
    console.log("Database Connected");
    console.log('====================================');


    return db;
}

export default connectDatabase;