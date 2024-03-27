export const DB_NAME = "Authentication"

// stringfying variable from your .env
export const conf = {
    googleClientId:String(process.env.GOOGLE_OAUTH_CLIENT_ID),
    googleClientSecret:String(process.env.GOOGLE_OAUTH_CLIENT_SECRET),
    googleOauthRedirectUri:String(process.env.GOOGLE_OAUTH_REDIRECT_URI),
    googleOauthTokenUri:String(process.env.GOOGLE_OAUTH_TOKEN_URI),
    corsOrigin:String(process.env.CORS_ORIGIN),
    mongoURI: String(process.env.MONGO_URI),
    accessTokenSecret: String(process.env.ACCESS_TOKEN_SECRET),
    refreshTokenSecret: String(process.env.REFRESH_TOKEN_SECRET),
    accessTokenExpiry: String(process.env.ACCESS_TOKEN_EXPIRY),
    refreshTokenExpiry: String(process.env.REFRESH_TOKEN_EXPIRY),
    resetPasswordTokenSecret: String(process.env.RESET_PASSWORD_TOKEN_SECRET),
    resetPasswordTokenExpiry: String(process.env.RESET_PASSWORD_TOKEN_EXPIRY),
    nodemailerSenderMailAddress :  String(process.env.NODEMAILER_SENDER_EMAIL_ADDRESS),
    nodemailerSenderMailPasskey :  String(process.env.NODEMAILER_SENDER_EMAIL_PASSKEY),
}