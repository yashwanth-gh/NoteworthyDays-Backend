import { ObjectId } from "mongoose";

export type User = {
    _id: ObjectId; // Assuming ObjectId is a custom type or imported from a library
    fullName: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    __v?: number;
}