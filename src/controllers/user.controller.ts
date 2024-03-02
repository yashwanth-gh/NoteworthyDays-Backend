import { getGoogleOAuthTokens } from "../services/user.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


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

const createNewAccountController = asyncHandler(async(req,res)=>{
    const {email, password} = req.body;

    console.log(email, password);

    /* 
    Here he handled the traditional email password login. 
    Generate a Access and refresh token For the traditional method.
    Save the user data In the session and also send it as a cookie. 
    */
    return res
        .status(200)
        .json(
            new ApiResponse(200, { email, password }, "auth code received")
        );
})
export {
    AuthenticateWithGoogleOAuth,
    createNewAccountController
};