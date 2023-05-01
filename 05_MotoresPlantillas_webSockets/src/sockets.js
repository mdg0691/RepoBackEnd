//Aqui voy a manejar los eventos de sockets
import { ProductManager } from '../src/ProductManager.js'

const ProductMana = new ProductManager('./productos.txt')

export default (io) => {

    io.on('connection', (socket) => {
        console.log("new user conected")

        socket.on("nuevoProducto", (prod) => {
            console.log(prod)
            ProductMana.addProduct(prod)
        })
    })
    

}