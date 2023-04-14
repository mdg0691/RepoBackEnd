import express from 'express'

//CONFIG EXPRESS
const app = express()
app.use(express.json()) //Permite ejecutar JSON en mi app
// app.use(express.urlencoded({ extended: true })) //Permite poder realizar consultas en la URL (req.query)

const PORT= 4000


//ARRAY DE USER CON LOS QUE VOY A TRABAJAR
const users = [
    {
        nombre: "Francisco",
        apellido: "Puig",
        id: 1,   
        cargo: "Profesor"        
    },
    {
        nombre: "Alex",
        apellido: "Terri",
        id: 2,
        cargo: "Tutor"        
    },{
        nombre: "Daniel",
        apellido: "per",
        id: 3,
        cargo: "Tutor"        
    }
]

app.get("/user",(req,res) => {
    res.send(JSON.stringify(users))
})
app.get("/user/:id",(req,res) => {
    const user = users.find(user => user.id === parseInt(req.params.id))
    res.send(JSON.stringify(user))
})

// app.post("/user", (req,res) => {
//     let {nombre, apellido, id, cargo} = req.body // consulto en postman
//     users.push({ nombre: nombre, apellido: apellido, id: id, cargo: cargo})//creo y guardo un nuevo obj
//     res.send("Usuario creado")
// })

app.post("/user", (req, res) => {
    const { nombre, apellido, id, cargo } = req.body //Consulto los datos enviados por postman
    users.push({ nombre: nombre, apellido: apellido, id: id, cargo: cargo }) //Creo y guardo un nuevo objeto
    res.send("Usuario creado")
})
app.put("/user/:idUser", (req,res) => {
    const idUser = parseInt(req.params.idUser)
    const {nombre, apellido, cargo} = req.body // consulto en postman

    let indice = users.findIndex( user => user.id === idUser)
    if(indice != -1){
        users[indice].nombre = nombre
        users[indice].apellido = apellido
        users[indice].cargo = cargo
        res.send("usuario Actualizado")// return implicito
    }


    //users.push({ nombre: nombre, apellido: apellido, id: id, cargo: cargo})//creo y guardo un nuevo obj
    res.send("Usuario no encontrado")
})


app.delete("/user/:idUser", (req, res) => {
    const indice = users.findIndex( user => user.id === parseInt(req.params.idUser))
    users.splice(indice, 1 )
    res.send("Usuario Eliminado")
})
app.listen(PORT, () => {
    console.log (`Server on port ${PORT}`)
})
// implementamos json para enviar a postman

app.use(express.json())// me permite ejecutar json en mi aplicacion
app.use(express.urlencoded({extended:true}))//permite poder realizar consultas en la URL(red.query)

