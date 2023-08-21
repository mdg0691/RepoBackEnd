import express from 'express'
import config from './config/config.js'
import './config/configDB.js'
import cookieParser from 'cookie-parser'
import { engine } from 'express-handlebars'
import __dirname from '../../35_3raPracticaIntegradora/src/utils/utils.js'
import userRouter from './routes/users.routes.js'
import productRouter from './routes/products.routes.js'
import authRouter from './routes/auth.routes.js'
import messageRouter from './routes/messages.routes.js'
import cartsRouter from './routes/carts.routes.js'
import { createRoles } from './libs/initialSetup.js'
import ticketsRouter from './routes/tickets.routes.js'
import router from './routes/email.routes.js'
import viewsRouter from './routes/views.routes.js'
import swagerJsdoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'

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

console.log(__dirname)
const spec = swagerJsdoc(swaggerOptions)

//configuro servidor
const app = express()
createRoles();
app.use(express.json())// desde express utilizo los obj json que llevan al servidor
app.use(express.urlencoded({extended:true}))

const PORT = config.port


//Inicializo cookkies como midlewere
app.use(cookieParser())
//Inicializo handlebars
app.engine('handlebars', engine({
    // importo handlebars y allowInsecurePrototypeAccess
    //con esta propiedad -> handlebars: allowInsecurePrototypeAccess(handlebars) -> soluciono el siguiente error
    //Handlebars: Access has been denied to resolve the property "title" because it is not an "own property" of its parent.
    // handlebars: allowInsecurePrototypeAccess(handlebars)
}))//voy a trabajar con handlebars 


app.set('view engine', 'handlebars')// mis vistas son de hbs (handle barts)
app.set("views", (__dirname + "/views"))

app.use('/', express.static(__dirname + '/public'))

// configuro routers
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/products', productRouter)
app.use('/api/messages', messageRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/tickets', ticketsRouter)
app.use('/api/correo', router)
app.use('/api/views', viewsRouter)
app.use('/apidocs', swaggerUiExpress.serve , swaggerUiExpress.setup(spec))



app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT}`)
})