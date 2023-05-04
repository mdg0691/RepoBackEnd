import express from 'express'
import productRouter from './routes/product.routes.js'
import { __dirname, __filename } from './path.js'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'
import http from "http"
import sockets from './sockets.js'
import *as path from 'path' //importo path para el manejo de las rutas
import { ProductManager } from '../src/ProductManager.js'


//Configuracion de express
const app = express()
const server = http.createServer(app)
const PORT = 4000
const httpServer = server.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

// const io = new Server(httpServer)


// const server = app.listen(PORT, () => {
//     console.log(`Server on port ${PORT}`)
// })


app.engine('handlebars', engine())//voy a trabajar con handlebars
app.set('view engine', 'handlebars')// mis vistas son de hbs (handle barts)
app.set('views', path.resolve(__dirname, './views')) // path.resolve es una concatenacion
// por lo que me concatena el directorio con dirname + view -> src/views

// middlewere
app.use(express.json()) //Permite ejecutar JSON en mi app
app.use(express.urlencoded({ extended: true })) //Permite poder realizar consultas en la URL (req.query)
app.use("/", express.static(__dirname + "/public"))
//ServerIO

const io = new Server( server, {cors: {origin:"*",credentials: true}}) //{cors: {origin:"*"}}
app.use(( req, res, next) => {
    req.io = io
    return next()
})

sockets(io)


// ROUTES

app.use('/product', productRouter)// app.use es para que se implemente 
// con esto cada vez q llame a product en la ruta, con productRouter me redirecciona
// en el codigo de la carpeta product.router.js

// app.use('/static', express.static(__dirname + '/public')) //Defino la ruta de mi carpeta publica 
app.use('/product', express.static(__dirname + '/public')) // clase 10 .. defino esta ruta  para poder acceder a mi css con hdbs


//HBS

const prodManager = new ProductManager('./productos.txt')


//ruta para realtime products
app.get('/', async (req, res) => {
   
    const products = await prodManager.getProducts()
    res.render('realTimeProducts', {
        products : products
    })
  });
