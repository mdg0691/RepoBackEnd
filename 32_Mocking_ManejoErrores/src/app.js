import express from 'express'
import routerProductsFaker from './routes/router.products.js';
import userRouter from './routes/router.users.js';
import errorHandler from './middleware/errors/index.js';


const app = express()
app.use(express.json())// desde express utilizo los obj json que llevan al servidor
app.use(express.urlencoded({extended:true}))

app.listen(8080,()=>{
    console.log("Server on port 8080");
})
app.use('/mockingproducts',routerProductsFaker)
app.use('/api/users',userRouter)
app.use(errorHandler)