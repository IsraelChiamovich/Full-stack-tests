// src/models/studentModel.ts

import mongoose, { Schema, Document, Types, Model } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import { IGrade, GradeSchema } from "./gradeModel";

export interface IStudent extends Document {
  name: string;
  email: string;
  password: string;
  className: string;
  class: Types.ObjectId;
  grades: IGrade[];
}

const StudentSchema = new Schema<IStudent>({
  name: { type: String, required: true },
  email: {type: String, required: true, unique: true, validate: validator.isEmail,},
  password: { type: String, required: true },
  class: { type: Schema.Types.ObjectId, ref: "Class", required: true },
  grades: [GradeSchema],
});

StudentSchema.pre<IStudent>("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const Student: Model<IStudent> = mongoose.model<IStudent>("Student", StudentSchema);
export default Student;
