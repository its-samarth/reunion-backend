"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const uri = process.env.MONGO_URI;
    // Check if the URI is defined
    if (!uri) {
        throw new Error("MONGO_URI is not defined in .env file");
    }
    const client = new mongodb_1.MongoClient(uri, {
        serverApi: {
            version: mongodb_1.ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });
    try {
        // Connect the client to the server
        yield client.connect();
        console.log("uri is up "); // This should print  URI or undefined
        // Send a ping to confirm a successful connection
        yield client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    catch (error) {
        console.log("uri is not working"); // This should print  URI or undefined
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit with failure
    }
    finally {
        // Close the connection if you're not keeping it open for the rest of the app
        yield client.close();
    }
});
exports.default = connectDB;
