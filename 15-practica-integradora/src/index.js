import 'dotenv/config.js'// con esta ya puedo usar mis variables de entorno
import express from 'express'
import mongoose from 'mongoose'
import { engine } from 'express-handlebars'
import __dirname from './utils.js'
import *as path from "path"
import { Server } from 'socket.io'
import { messageModel } from './models/Messages.js'
import  cartModel  from './models/Cart.js'
import productModel from './models/Products.js'

// Config server
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Config  BDD ATLAS conection
mongoose.connect(process.env.URL_MONGODB_ATLAS)
    .then(() =>console.log("MongoDB Atlas is connected"))
    .catch((error) => console.log("error en module Atlas :"))

//conf server port
const server = app.listen(process.env.PORT, () => {
    console.log("Server on port", process.env.PORT)
})

//ServerIO Sockets

const io = new Server(server)


io.on('connection', (socket) => {
    console.log("Cliente conectado")
    socket.on("mensaje", info => {

        //destructuring object info to send user and message to Atlas throug messageModel
        const {usuario , mensaje} = info
        const user = JSON.stringify(usuario)
        const message = JSON.stringify(mensaje)
        
 
        messageModel.create([
            {
                user: user,
                message: message
            }
        ])
    })
})
// struct handlebars
app.engine('handlebars', engine())//voy a trabajar con handlebars 
app.set('view engine', 'handlebars')// mis vistas son de hbs (handle barts)
app.set("views", path.resolve(__dirname + "/views"))

// path to public folder
app.use('/', express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.render('chat',)
    })

 