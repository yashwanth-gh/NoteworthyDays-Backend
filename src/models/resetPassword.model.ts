import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import { conf } from "../constants";

export interface ResetPassword extends Document{
    user_id: string;
    resetToken: string;
    timestamp: Date;
}

const resetPasswordSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        resetToken: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now,
            required: true,
            get: function (this: { timestamp: Date }) {
                return this.timestamp.getTime();
            },
            set: function (this: { timestamp: Date }, timestamp: any) {
                this.timestamp = new Date(timestamp);
            }
        }
    }, {
    timestamps: true,
}
)

resetPasswordSchema.methods.generateResetPasswordToken = function () {
    return jwt.sign(
        {
            user_id: this.user_id
        },
        conf.resetPasswordTokenSecret,
        {
            expiresIn: conf.resetPasswordTokenExpiry
        });
}

export default mongoose.model<ResetPassword>("ResetPassword",resetPasswordSchema)