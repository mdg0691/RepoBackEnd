import express from 'express'
import productRouter from './routes/product.routes.js'
import { __dirname, __filename } from './path.js'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'
import http from "http"
// import sockets from './sockets.js'
import *as path from 'path' //importo path para el manejo de las rutas



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

//ServerIO

const io = new Server( server, {cors: {origin:"*",credentials: true}}) //{cors: {origin:"*"}}
app.use(( req, res, next) => {
    req.io = io
    return next()
})

// sockets(io)


io.on('connection', async (socket) => {
    console.log("Cliente conectado")

    socket.on("mensaje", info => {
        console.log(info)
        // mensajes.push(info)
        // io.emit("mensajes", mensajes) //Le envio todos los mensajes guardados
    })

    socket.on("nuevoProducto", (prod) => {
        console.log(prod)
    })
})

// ROUTES

app.use('/product', productRouter)// app.use es para que se implemente 
// con esto cada vez q llame a product en la ruta, con productRouter me redirecciona
// en el codigo de la carpeta product.router.js

// app.use('/static', express.static(__dirname + '/public')) //Defino la ruta de mi carpeta publica 
app.use('/product', express.static(__dirname + '/public')) // clase 10 .. defino esta ruta  para poder acceder a mi css con hdbs



//HBS
app.get("/", (req, res) => {
    res.render('realTimeProducts')
})


// app.get('/', (req, res) => {
//     const tutor = {
//         nombre: 'Luciana Rosa Gonzalez',
//         email : 'lu@lu.com',
//         rol: 'tutor'
//     }

//     const cursos =[
//         {numero:'12',nombre:'c++',dia:'mym',horario:'afternoon'},
//         {numero:'345',nombre:'react',dia:'akdsf',horario:'nigh'},
//         {numero:'64',nombre:'linux',dia:'asdf',horario:'man'}
//     ]
// //primer parametro indico la vista a utilizar ejm home , about

//     res.render('home',{    
//          titulo :"plataforma coder",
//          mensaje: "hola buenos dias",
//          user : tutor,
//          isTutor: tutor.rol === "tutor", //VoF
//          cursos: cursos
        
//     })
//     })

