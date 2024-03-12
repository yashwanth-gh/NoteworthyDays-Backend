import mongoose, { Document } from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { conf } from "../constants.js";

export interface UserInput {
    fullName: string;
    email: string;
    password: string;
    refreshToken?: string;
}

export interface UserDocument extends UserInput, Document {
    createdAt: Date;
    updatedAt: Date;
    isPasswordCorrect(password: string): Promise<boolean>;
    generateAccessToken(): string;
    generateRefreshToken(): string;
}

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    return next();
})

userSchema.methods.isPasswordCorrect = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password).catch(err => false)
}


userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
        _id : this._id,
        email : this.email,
        fullName : this.fullName,
        },
        conf.accessTokenSecret,
        {
            expiresIn : conf.accessTokenExpiry
        }
    )
};


userSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
        {
        _id : this._id,
        },
        conf.refreshTokenSecret,
        {
            expiresIn : conf.refreshTokenExpiry
        }
    )
};

export default mongoose.model<UserDocument>("User", userSchema)