"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        res.status(401).json({ message: 'Authorization token is required' });
        return;
    }
    try {
        // Decode the token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET); // 'id' instead of 'userId'
        // Attach 'id' to 'userId' in the request
        const authReq = req;
        authReq.userId = decoded.id;
        console.log("Decoded Token:", decoded);
        console.log("User ID attached to request:", authReq.userId);
        console.log("Type of userId in request:", typeof authReq.userId);
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
exports.authenticate = authenticate;
