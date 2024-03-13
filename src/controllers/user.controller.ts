import { create } from "domain";
import User from "../models/user.model.js";
import { getGoogleOAuthTokens } from "../services/user.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";


const generateAccessAndRefreshToken = async (userId: string) => {
    /* This code is a function called generateAccessAndRefreshToken that takes a userId as a parameter.
  Inside the function, it first uses the User model to find a user with the given userId using the findById method. This is an asynchronous operation, so it uses the await keyword to wait for the result.
  Once the user is found, it calls the generateAccessToken and generateRefreshToken methods on the user object to generate an access token and a refresh token respectively.
  After that, it saves the user object with the save method. The {validateBeforeSave:false} option is passed to disable validation before saving the user object.
  Finally, it returns an object containing the access token and refresh token.
  Overall, this code retrieves a user by their ID, generates an access token and a refresh token for that user, saves the user object, and returns the tokens. */

    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, "User not found");

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
}

const AuthenticateWithGoogleOAuth = asyncHandler(async (req, res) => {
    /*
    Workflow:
    1. Get code from query string
    2. Get ID and access token By exchanging the Authorization code.
    3. Get the users Token. 
    4. Get the user's profile. 
    5. Create a new user By creating a session.
    6. Set the cookies. 
    7. Redirect to client.  
    */

    // 1. Get code from query string
    const code = req.query.code as string;

    // 2. Get ID and access token By exchanging the Authorization code.
    const { id_token, access_token } = await getGoogleOAuthTokens({ code });

    console.log({ id_token, access_token });
    //TODO: As of now, till this step, everything is working as I thought 
    /*TODO: Next step is to Save the id token and access token in the database
    With the user data received from Google(Which I should Make another api call)
    And then save the user data in the database.And then I Set the cookies and also the session 
    And I also need to handle the Traditional email password login Also.  
    */

    return res
        .status(200)
        .json(
            new ApiResponse(200, { code }, "auth code received")
        );
})

const createNewAccountController = asyncHandler(async (req, res) => {
    /* 
    Here he handled the traditional email password login. 
    Generate a Access and refresh token For the traditional method.
    Save the user data In the session and also send it as a cookie. 
    */

    /*
    ^STEPS FOR THIS CONTROLLER :
    1. Extract fullName, email, and password from the request body.
    2. Check if a user with the provided email already exists in the database.
    3. If a user with the email exists:
        - Throw a 409 (Conflict) ApiError indicating that the user already exists.
    4. If no user with the email exists:
        - Create a new user in the database using the User model, with the provided fullName, email, and password.
        - Get the created user's details (excluding password and refreshToken) from the database.
        - If the created user is not found, throw a 500 ApiError.
    5. Return a JSON response with a 200 status code, containing:
        - An ApiResponse object with a success message and the details of the created user (excluding password and refreshToken). 
    */

    const { fullName, email, password } = req.body;

    const existedUser = await User.findOne({ email });

    if (existedUser) {
        throw new ApiError(409, "User with username or email already exists");
    }

    const user = await User.create({
        fullName,
        email,
        password,
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) throw new ApiError(500, "User not created")


    return res
        .status(200)
        .json(
            new ApiResponse(200, { createdUser }, "user created")
        );
})

const loginExistingUserController = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid password");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );
    
    const tenDaysInMilliseconds = 10 * 24 * 60 * 60 * 1000; // 10 days in milliseconds
    const options = {
        httpOnly: true,
        secure: false,
        expires: new Date(Date.now() + tenDaysInMilliseconds)
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                },
                "User logged in successfully"
            )
        );

});

//FIXME: This is a test controller to just check. Whether the login controller is working properly this controller. 
//Just just Receives the cookies sent back by the browser. 
const testCont = asyncHandler(async(req,res)=>{
    const data = req.body;
    console.log(data);
    const access_token = req.cookies.accessToken;
    const refresh_token = req.cookies.refreshToken;
    // console.log({access_token,refresh_token});
    //*Working Correctly

    res.status(200)
    .json(
        new ApiResponse(
            200,
            {
                "response":"nothing all ok"
            },
            "User logged in successfully"
        )
    );
})

export {
    AuthenticateWithGoogleOAuth,
    createNewAccountController,
    loginExistingUserController,
    testCont
};