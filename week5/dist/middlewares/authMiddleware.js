"use strict";
// src/middlewares/authMiddleware.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateStudent = exports.authenticateTeacher = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (token) => jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
const authenticate = (role) => (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ message: "Unauthorized: No token provided" });
        return;
    }
    try {
        const decoded = verifyToken(token);
        if (!decoded || decoded.role !== role) {
            res.status(403).json({ message: "Access forbidden: Insufficient role" });
            return;
        }
        req.body.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid token", error });
        return;
    }
};
exports.authenticateTeacher = authenticate("teacher");
exports.authenticateStudent = authenticate("student");
