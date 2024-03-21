import axios from "axios";
import { conf } from "../constants.js";
import qs from "qs";
import { log } from "console";
import { ApiError } from "../utils/ApiError.js";

interface GoogleTokens{
    access_token:string;
    refresh_token:string;
    scope:string;
    expires_in:number;
    id_token:string;
}

export async function getGoogleOAuthTokens ({code}:{code:string}):Promise<GoogleTokens> {
    const uri = conf.googleOauthTokenUri;
    const values = {
        code,
        client_id:conf.googleClientId,
        client_secret:conf.googleClientSecret,
        grant_type:"authorization_code",
        redirect_uri:conf.googleOauthRedirectUri
    }
// console.log(uri)
// console.log(values)
    try {
        const response = await axios.post<GoogleTokens>(uri,qs.stringify(values),
        {
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
            }
        })
        return response.data;
    } catch (error) {
        console.log("ERROR :: getGoogleOAuthTokens :: Failed to fetch google oauth tokens",error);
        throw new ApiError(500,"Failed to fetch google oauth tokens");
    }
}
