// import http, { request } from 'http'

// const PORT = 4000 //forma de conectarme a un servidor mediante accesos
// // el 3000 se lo usa para react y el 4000 seria mi servidor

// const server = http.createServer((request, response ) =>{
//     response.end("Hola , este es mi primer node")
// })

// //ejecutar servidor
// // ENVIAL EL USUARIO DEVUELVO EL USUARIO
// server.listen(PORT, ()=>{
//     console.log(`Server on port ${PORT}`)//SABER SI MI APP FUNCIONA
// })


import express from 'express'
const app= express()
const PORT = 4000

app.use(express.urlencoded({extended:true}))
const users = [
    {
        id:1,
        nombre :"pedro",
        rol: "profesor"
    },
    {
        id:2,
        nombre :"maria",
        rol: "m"
    },{
        id:3,
        nombre :"marta",
        rol: "psd"
    }
]
app.get('/', (req, res) => {
    res.send ("mi primer servidor express en CODER")
})
app.get('/user', (req, res) => {
    let {nombre ,rol}=req.query
    const usuarios = users.filter(user => user.rol== rol)
    res.send (JSON.stringify(usuarios))
})


app.get('/:id', (req, res) => {// agregar despues ruta user min 5.30
    const user = users.find(usuario => usuario.id === parseInt(req.params.id))//consulto un usuario dedo el id recibido)
    
    if(user){
        res.send (`El usuario con el id ${req.params.id} se llama ${user.nombre}`)    
    }else{
        res.send (`El usuario con el id ${req.params.id} no se encuentra`)
    }
    console.log(req.params.id)
    
})

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})