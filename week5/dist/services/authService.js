"use strict";
// src/services/authService.ts
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
exports.loginUser = void 0;
const teacherModel_1 = __importDefault(require("../models/teacherModel"));
const studentModel_1 = __importDefault(require("../models/studentModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    let user;
    let role;
    user = yield teacherModel_1.default.findOne({ email });
    if (user) {
        role = "teacher";
    }
    else {
        user = yield studentModel_1.default.findOne({ email });
        if (user) {
            role = "student";
        }
        else {
            console.error("User not found");
            throw new Error("User not found");
        }
    }
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        console.error("Incorrect password");
        throw new Error("Incorrect password");
    }
    const token = jsonwebtoken_1.default.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return { token };
});
exports.loginUser = loginUser;
