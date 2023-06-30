import mongoose from "mongoose";
// import config from './config.js' 

// const URL = config.mongo.url

//Config  BDD ATLAS conection
mongoose.connect(process.env.URL_MONGODB_ATLAS)
.then(() =>console.log("MongoDB Atlas is connected"))
.catch((error) => console.log("error en module Atlas :"))

