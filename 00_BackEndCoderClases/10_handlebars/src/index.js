import express from 'express'
import productRouter from './routes/product.routes.js'
import multer from 'multer'
import { __dirname, __filename } from './path.js'
import { engine } from 'express-handlebars'
import *as path from 'path' //importo path para el manejo de las rutas


//Configuracion de express
const app = express()
const PORT = 4000
const storage = multer.diskStorage({ // destino de mis imagenes cargadas
    destination: (req,file,cb) => {
        cb(null, 'src/public/img')
    },
    filename: (req,file,cb) => {
        cb(null, `${file.originalname}`)
    }
})

app.engine('handlebars', engine())//voy a trabajar con handlebars
app.set('view engine', 'handlebars')// mis vistas son de hbs (handle barts)
app.set('views', path.resolve(__dirname, './views')) // path.resolve es una concatenacion
// por lo que me concatena el directorio con dirname + view -> src/views

// middlewere
app.use(express.json()) //Permite ejecutar JSON en mi app
app.use(express.urlencoded({ extended: true })) //Permite poder realizar consultas en la URL (req.query)
const upload = (multer({storage:storage}))//Instancio un objeto con la configuracion de multer presentada



// ROUTES

app.use('/product', productRouter)// app.use es para que se implemente 
// con esto cada vez q llame a product en la ruta, con productRouter me redirecciona
// en el codigo de la carpeta product.router.js

// app.use('/static', express.static(__dirname + '/public')) //Defino la ruta de mi carpeta publica 
app.use('/', express.static(__dirname + '/public')) // clase 10 .. defino esta ruta  para poder acceder a mi css con hdbs

app.post('/upload', upload.single('product') , (req,res) => {
    //Imagenes
    console.log(req.body)
    console.log(req.file)
    res.send("Imagen subida")
})

//HBS

app.get('/', (req, res) => {
    const tutor = {
        nombre: 'Luciana Rosa Gonzalez',
        email : 'lu@lu.com',
        rol: 'tutor'
    }

    const cursos =[
        {numero:'12',nombre:'c++',dia:'mym',horario:'afternoon'},
        {numero:'345',nombre:'react',dia:'akdsf',horario:'nigh'},
        {numero:'64',nombre:'linux',dia:'asdf',horario:'man'}
    ]
//primer parametro indico la vista a utilizar ejm home , about

    res.render('home',{    
         titulo :"plataforma coder",
         mensaje: "hola buenos dias",
         user : tutor,
         isTutor: tutor.rol === "tutor", //VoF
         cursos: cursos
        
    })
    })

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})