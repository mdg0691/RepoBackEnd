import dotenv from 'dotenv'

dotenv.config()

export default {
    mongo_uri: process.env.MONGO_URI,
    port: process.env.PORT,
    private_key: process.env.PRIVATE_KEY,
    session_key: process.env.SESSION_KEY,
    jwt_cookie:process.env.JWT_COOKIE,
    jwt_secret:process.env.JWT_SECRET,
    google_client_id:process.env.GOOGLE_CLIENT_ID,
    google_client_secret:process.env.GOOGLE_CLIENT_SECRET,
    mailing_user:process.env.MAILING_USER,
    mailing_password:process.env.MAILING_PASSWORD,
    mailing_service:process.env.MAILING_SERVICE
}


// {
//     MONGO:{
//         URL:process.env.MONGO_URI,
//     },
//     JWT{
//         COOKIE:process.env.JWT_COOKIE,
//         SECRET:process.env.JWT_SECRET
//     }

// }

