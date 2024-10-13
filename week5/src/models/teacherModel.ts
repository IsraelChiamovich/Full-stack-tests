// src/models/teacherModel.ts

import mongoose, { Schema, Document, Types, Model } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

export interface ITeacher extends Document {
  name: string;
  email: string;
  password: string;
  className: string;
  class?: Types.ObjectId;
}

const TeacherSchema = new Schema<ITeacher>({
  name: { type: String, required: true },
  email: {type: String, required: true, unique: true, validate: validator.isEmail, },
  password: { type: String, required: true },
  class: { type: Schema.Types.ObjectId, ref: "Class"},
});

TeacherSchema.pre<ITeacher>("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const Teacher: Model<ITeacher> = mongoose.model<ITeacher>("Teacher", TeacherSchema);
export default Teacher;