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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwtUtils_1 = require("../utils/jwtUtils");
// Mock user data
const users = [
    {
        id: 1,
        email: "admin@mail.com",
        password: bcryptjs_1.default.hashSync("password123", 10), // Hash for 'password123'
    },
];
// Login Controller
const login = (req, res, next // Include NextFunction for compatibility
) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Validate input
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required" });
            return;
        }
        // Find user
        const user = users.find((u) => u.email === email);
        if (!user) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }
        // Check password
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }
        // Generate token
        const token = (0, jwtUtils_1.generateToken)({ id: user.id, email: user.email });
        res.status(200).json({ token });
    }
    catch (error) {
        next(error); // Pass the error to the next middleware (optional)
    }
});
exports.login = login;
// Register Controller
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Validate input
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required" });
            return;
        }
        // Check if user already exists
        const existingUser = users.find((u) => u.email === email);
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        // Hash password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Create new user
        const newUser = {
            id: users.length + 1, // Auto-increment ID
            email,
            password: hashedPassword,
        };
        // Add user to the database (mock here)
        users.push(newUser);
        // Generate token
        const token = (0, jwtUtils_1.generateToken)({ id: newUser.id, email: newUser.email });
        // Respond with the created user and token
        res.status(201).json({
            message: "User created successfully",
            user: { id: newUser.id, email: newUser.email },
            token,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});
exports.register = register;
