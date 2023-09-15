import dotenv from 'dotenv'

dotenv.config()

export default {
    mongo_uri: process.env.MONGO_URI,
    port: process.env.PORT,
    private_key: process.env.PRIVATE_KEY,
    gmail_user:process.env.GMAIL_USER,
    gmail_password:process.env.GMAIL_PASSWORD,
    jwt_cookie:process.env.JWT_COOKIE,
    jwt_secret:process.env.JWT_SECRET,
    jwt_refresh_secret:process.env.JWT_REFRESH_SECRET
}