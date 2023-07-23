import express from 'express'
import config from './config/config.js'
import './config/configDB.js'
import userRouter from './routes/users.routes.js'
import productRouter from './routes/products.routes.js'
import authRouter from './routes/auth.routes.js'
import messageRouter from './routes/messages.routes.js'
import cartsRouter from './routes/carts.routes.js'
import { createRoles } from './libs/initialSetup.js'
import ticketsRouter from './routes/tickets.routes.js'



//configuro servidor
const app = express()
createRoles();
app.use(express.json())// desde express utilizo los obj json que llevan al servidor
app.use(express.urlencoded({extended:true}))

const PORT = config.port

app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT}`)
})

// configuro routers
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/products', productRouter)
app.use('/api/messages', messageRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/tickets', ticketsRouter)