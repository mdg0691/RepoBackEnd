import 'dotenv/config'// con esta ya puedo usar mis variables de entorno
import express from 'express'
import mongoose from 'mongoose'
import { engine } from 'express-handlebars'
import __dirname from './utils.js'
import *as path from "path"
import { Server } from 'socket.io'
import { messageModel } from './models/Messages.js'
import productRouter from './routes/product.routes.js'
import cartRouter from './routes/cart.routes.js'
// import productModel from './models/Products.js'

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

// // Función para generar un código de producto único
// function generateProductCode() {
//     var code = '';
//     var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//     for (var i = 0; i < 6; i++) {
//       code += characters.charAt(Math.floor(Math.random() * characters.length));
//     }
//     return code;
//   }
  
//   // Lista de categorías y productos
//   var categories = {
//     lacteos: ['Leche', 'Queso', 'Yogurt'],
//     fiambres: ['Jamon', 'Mortadela'],
//     carniceria: ['Lomo', 'Cerdo', 'Queperi', 'Costilla', 'Chorizo', 'Morcilla'],
//     panaderia: ['Pan', 'Facturas', 'Chipa', 'Churros'],
//     verduras: ['Tomate', 'Cebolla', 'Pimiento', 'Zapallo', 'Papa'],
//     frutas: ['Naranja', 'Mandarina', 'Manzana', 'Pera', 'Uva', 'Cereza'],
//     bebidas: ['Agua', 'Refresco', 'Jugo']
//   };
  
//   // Generar una lista de productos aleatorios
//   var products = [];
//   var productId = 1;
//   for (var category in categories) {
//     if (categories.hasOwnProperty(category)) {
//       var productList = categories[category];
//       for (var i = 0; i < productList.length; i++) {
//         var product = {
//           title: productList[i],
//           description: 'Descripción de ' + productList[i],
//           code: generateProductCode(),
//           category: category,
//           price: Math.random() * 100,
//           stock: Math.floor(Math.random() * 100),
//           status: true,
//           thumbnail: []
//         };
//         products.push(product);
//         productId++;
//       }
//     }
//   }
  
  // Insertar los productos en la colección 'productos'
//   await productModel.insertMany(products);
// await productModel.deleteMany({});
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

// ROUTES

app.use('/products', productRouter)// app.use es para que se implemente 
// con esto cada vez q llame a product en la ruta, con productRouter me redirecciona
// en el codigo de la carpeta product.router.js
app.use('/cart', cartRouter)

app.use('/', express.static(__dirname + '/public'))

// app.get('/', (req, res) => {
//     res.render('chat',)
//     })
////////////////
