const DB_NAME = "Authentication"

export const conf = {
    googleClientId:String(process.env.GOOGLE_OAUTH_CLIENT_ID),
    googleClientSecret:String(process.env.GOOGLE_OAUTH_CLIENT_SECRET),
    googleOauthRedirectUri:String(process.env.GOOGLE_OAUTH_REDIRECT_URI),
    googleOauthTokenUri:String(process.env.GOOGLE_OAUTH_TOKEN_URI),
}