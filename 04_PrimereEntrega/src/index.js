import express from 'express'
import productRouter from './routes/product.routes.js'
import cartRouter from './routes/cart.routes.js'
// import multer from 'multer'
import { __dirname, __filename } from './path.js'


//Configuracion de express
const app = express()
const PORT = 4000
// const storage = multer.diskStorage({ // destino de mis imagenes cargadas
//     destination: (req,file,cb) => {
//         cb(null, 'src/public/img')
//     },
//     filename: (req,file,cb) => {
//         cb(null, `${file.originalname}`)
//     }
// })

// middlewere
app.use(express.json()) //Permite ejecutar JSON en mi app
app.use(express.urlencoded({ extended: true })) //Permite poder realizar consultas en la URL (req.query)
// const upload = (multer({storage:storage}))//Instancio un objeto con la configuracion de multer presentada



// ROUTES

app.use('/product', productRouter)// app.use es para que se implemente 
// con esto cada vez q llame a product en la ruta, con productRouter me redirecciona
// en el codigo de la carpeta product.router.js
app.use('/carts', cartRouter)

app.use('/static', express.static(__dirname + '/public')) //Defino la ruta de mi carpeta publica


// app.post('/upload', upload.single('product') , (req,res) => {
//     //Imagenes
//     console.log(req.body)
//     console.log(req.file)
//     res.send("Imagen subida")
// })



app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})