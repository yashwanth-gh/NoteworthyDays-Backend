import mongoose, { Schema, Document } from 'mongoose';

// Define interface for user verification document
interface IUserVerification extends Document {
    user_id: mongoose.Types.ObjectId;
    otp: number;
    timestamp: Date;
}

// Define mongoose schema for user verification
const UserVerificationSchema: Schema = new Schema(
    {
    user_id: {
         type: mongoose.Schema.Types.ObjectId,
         ref:"User",
         required: true 
        },
    otp: {
         type: Number,
         required: true
        },
    timestamp: {
         type: Date,
         default: Date.now, 
         required: true,
         get : (timestamp:Date)=>timestamp.getTime(),
         set : (timestamp:any)=> new Date(timestamp)
        }
});

// Define and export UserVerification model
export default mongoose.model<IUserVerification>('UserVerification', UserVerificationSchema);