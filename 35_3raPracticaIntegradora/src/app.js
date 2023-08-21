import express from 'express'
import config from './config/config.js'
import './config/configDB.js'
import { engine } from 'express-handlebars'
import *as path from "path"
import './config/passport.config.js'
import __dirname from './utils/utils.js'
import userRouter from './routes/users.routes.js'
import viewsRouter from './routes/views.routes.js'
import productRouter from './routes/products.routes.js'
import authRouter from './routes/auth.routes.js'
import messageRouter from './routes/messages.routes.js'
import cartsRouter from './routes/carts.routes.js'
import { createRoles } from './libs/initialSetup.js'
import ticketsRouter from './routes/tickets.routes.js'
import passport from 'passport'
import session from "express-session"
import MongoStore from "connect-mongo"





//configuro servidor
const app = express()
createRoles();
app.use(express.json())// desde express utilizo los obj json que llevan al servidor
app.use(express.urlencoded({extended:true}))

const PORT = config.port
app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT}`)
})

app.use(session({
    store: MongoStore.create({
        mongoUrl:config.mongo_uri,
        mongoOptions: {useNewUrlParser:true,
        useUnifiedTopology:true
        },
        ttl:210 // tiempo que dura la sesion
    
    }),
    secret:config.session_key,
    resave: true,
    saveUninitialized:true
}))

//passport
app.use(passport.initialize())
app.use(passport.session())

// struct handlebars
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
app.use('/', viewsRouter)
app.use('/api/auth', authRouter)
app.use('/api/products', productRouter)
app.use('/api/messages', messageRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/tickets', ticketsRouter)