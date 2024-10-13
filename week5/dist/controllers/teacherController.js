"use strict";
// src/ controllers/teacherController.ts
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
exports.register = void 0;
const teacherService_1 = require("../services/teacherService");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, className } = req.body;
    try {
        const newTeacher = yield (0, teacherService_1.registerTeacher)(name, email, password, className);
        res.status(201).json({ message: "Teacher registered and class created successfully", teacher: newTeacher });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.register = register;
