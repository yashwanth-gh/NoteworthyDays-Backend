import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import userModel, { UserDocument, UserInput } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { sendSuccessulAdminApprovedMail } from "../utils/nodemailer.js";
import { Types } from "mongoose";

interface UserDocumentArray extends Array<UserDocument> { };

export class AdminController {

    viewAllPendingAdminRequests = asyncHandler(async (req: Request, res: Response) => {

        const pendingAdminRequests: UserDocumentArray = await userModel.aggregate([
            {
                $match: {
                    "role.role_type": "admin",
                    "role.is_role_verified": false
                }
            },
            {
                $project: {
                    password: 0
                }
            }
        ]);

        if (!pendingAdminRequests) {
            return res.status(404).json({
                message: "No pending admin requests found"
            })
        }


        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    pendingAdminRequests,
                    "All pending admin requests fetched successfully"
                )
            )
    })

    approvePendingAdminRequest = asyncHandler(async (req: Request, res: Response) => {

        const { userId } = req.query;

        if (!userId) {
            throw new ApiError(400, "Bad request : User id is required")
        }

        // Convert userId to ObjectId type
        const objectIdUserId = new Types.ObjectId(userId as string);

        // Update the user's role if they are an admin and not already verified
        const user = await userModel.findOneAndUpdate(
            {
                _id: objectIdUserId,
                "role.role_type": "admin",
                "role.is_role_verified": false
            },
            { $set: { "role.is_role_verified": true } },
            { new: true }
        ).select("-password") as UserDocument

        if (!user) {
            throw new ApiError(404, "User not found or already verified");
        }

        await sendSuccessulAdminApprovedMail(user);

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    user,
                    "Admin request approved successfully"
                )
            )

    })

}

const adminController = new AdminController();
export default adminController;