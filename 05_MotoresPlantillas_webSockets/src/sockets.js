//Aqui voy a manejar los eventos de sockets
import { ProductManager } from '../src/ProductManager.js'


const ProductMana = new ProductManager('./productos.txt')

export default (io) => {

    io.on('connection', (socket) => {
        console.log("new user conected")

        // envio producto a mi productos.txt mediante el metodo add Product
        socket.on("nuevoProducto", async (prod) => {
            console.log(prod)
            // const propertyValues = ((Object.values(prod)).toString()).slice(1, -1);
            const propertyValues = (Object.values(prod)).toString() // transformo obj a string debido a q me envia las prop como string
            console.log(propertyValues);
            console.log(typeof(propertyValues));
            const prodJson = JSON.parse(propertyValues)// parse el producto para utilizar el metodo add product
            console.log(prodJson);
            await ProductMana.addProduct(prodJson)

            const products = await ProductMana.getProducts()
            socket.emit("listado", {products : products})
        })
        socket.on("delete-product" , async (prodDel) => {
            
            const prodDelete = Object.values(prodDel)
            console.log(typeof(prodDelete))
            console.log(prodDelete)
            await ProductMana.deleteProduct(prodDelete)
            const products = await ProductMana.getProducts()
            socket.emit("listado", {products : products})
        })
    })

    
    
}