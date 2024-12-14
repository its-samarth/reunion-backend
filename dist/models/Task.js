"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Create the Task schema
const taskSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    priority: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "finished"],
        default: "pending",
    },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    totalTime: { type: Number, default: 0 },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true }, // Link to user
}, { timestamps: true });
// Middleware to calculate the total time before saving
taskSchema.pre("save", function (next) {
    // Calculate the total time in hours
    if (this.startTime && this.endTime) {
        const start = new Date(this.startTime).getTime();
        const end = new Date(this.endTime).getTime();
        this.totalTime = (end - start) / (1000 * 60 * 60); // Convert ms to hours
    }
    next();
});
const Task = mongoose_1.default.model("Task", taskSchema);
exports.default = Task;
