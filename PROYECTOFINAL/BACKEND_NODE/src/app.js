import express from 'express'
import config from './config/config.js'
import './config/configDB.js'
import cookieParser from 'cookie-parser'
import __dirname from '../src/utils/utils.js'
import userRouter from './routes/users.routes.js'
import productRouter from './routes/products.routes.js'
import authRouter from './routes/auth.routes.js'
import cartsRouter from './routes/carts.routes.js'
import { createRoles } from './libs/initialSetup.js'
import ticketsRouter from './routes/tickets.routes.js'
import router from './routes/email.routes.js'
import swagerJsdoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'
import cors from 'cors'


const swaggerOptions ={
    definition:{
        openapi: '3.0.0',
        info:{
            title:'Documentacion de APIs',
            description: 'Informacion de Usuarios y Carts',
            version:'1.0.0',
            contact:{
                name:'Marcelo',
                url:'marcelo@gmail.com'
            }
        }
    },
    apis:[`${__dirname}/docs/**/*.yaml`]
}
const spec = swagerJsdoc(swaggerOptions)

// configuro servidor
const app = express()
createRoles();

app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))
app.use(express.json())// desde express utilizo los obj json que llevan al servidor
app.use(express.urlencoded({extended:true}))

const PORT = config.port
app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT}`)
})

//Inicializo cookkies como midlewere
app.use(cookieParser())

// configuro routers
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/tickets', ticketsRouter)
app.use('/api/correo', router)
app.use('/apidocs', swaggerUiExpress.serve , swaggerUiExpress.setup(spec))




