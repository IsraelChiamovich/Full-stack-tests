// src/models/classModel.ts

import mongoose, { Schema, Document, Types, Model } from "mongoose";

export interface IClass extends Document {
    name: string;
    teacher: Types.ObjectId;
    students: Types.ObjectId[];
}

const ClassSchema = new Schema<IClass>({
    name: { type: String, required: true, unique: true },
    teacher: { type: Schema.Types.ObjectId, ref: "Teacher"},
    students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
});

const Class: Model<IClass> = mongoose.model<IClass>("Class", ClassSchema);
export default Class;