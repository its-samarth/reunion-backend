"use strict";
// import { MongoClient, ServerApiVersion } from 'mongodb';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.MONGO_URI || "");
        console.log("MongoDB connected successfully");
    }
    catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
});
exports.default = connectDB;
