export default (io) => {

    io.on('connection', (sockets) => {
        console.log("new user conected")
    })
    io.on("nuevoProducto", (prod) => {
        console.log(prod)
    })

}