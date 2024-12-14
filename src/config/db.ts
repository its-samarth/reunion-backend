// import { MongoClient, ServerApiVersion } from 'mongodb';


// const connectDB = async (): Promise<void> => {
//   const uri = process.env.MONGO_URI;

//   // Check if the URI is defined
//   if (!uri) {
//     throw new Error("MONGO_URI is not defined in .env file");
//   }

//   const client = new MongoClient(uri, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     },
//   });

//   try {
//     // Connect the client to the  server
//     await client.connect();
//     console.log("uri is up ");  // This should pr int URI or undefined

//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");

//   } catch (error) {
//     console.log("uri is not working");  // This should print  URI or undefined
//     console.error("Error connecting to MongoDB:", error);
//     process.exit(1); // Exit with failure
//   } finally {
//     // Close the connection if you're not keeping it open for the rest of the app
//     await client.close(); 
//   }
// };

// export default connectDB;

import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "");
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectDB;
