import { promises as fs } from 'fs'

export class CartManager{
    constructor(path){
        this.path = path
    }

    // para incrementar id carritos
    static incrementarID() {
        if (this.idIncrement) {
            this.idIncrement++
        } else {
            this.idIncrement = 1
        }
        return this.idIncrement
    }

    //incremento de id de producto en carrito
    static incrementarCartID() {
        if (this.idCartIncrement) {
            this.idCartIncrement++
        } else {
            this.idCartIncrement = 1
        }
        return this.idCartIncrement
    }

    // Metodo para crear carrito 
    async createCart() {
        const cartsJSON = await fs.readFile(this.path, 'utf-8')
        const carts = JSON.parse(cartsJSON)
        const carrito = {
            id: CartManager.incrementarID(),
            cantidad: []
        }
        carts.push(carrito)
        await fs.writeFile(this.path, JSON.stringify(carts))
        return "Carrito creado"
    }

    // Metodo para obtener todos los carritos y productos
    async getCart() {
        try{
            const cartsJSON = await fs.readFile(this.path, 'utf-8')
            return JSON.parse(cartsJSON)
        }catch(error){
            return "Carrito no encontrado"
        }
    }

    // Metodo para obtener carrito por id
    async getCartById(id) {
        const carts = await this.getCart()
        if (carts.some(cart => cart.id === parseInt(id)))
            try{
                return carts.find(cart => cart.id === parseInt(id))
            } catch (error){
                return "Carrito no encontrado"
            }
    }

    // Metodo para actualizar producto o agregar producto en carrito en caso que no exista
    async addProductCart(idCart,producto) {
        const carts = await this.getCart()
        const carrito = carts.find(cart => cart.id === parseInt(idCart))
        if (carrito.cantidad.some(product => product.id === parseInt(producto.id)))
         {
            
            const index = carrito.cantidad.findIndex(prod => prod.id === parseInt(producto.id))
            console.log(typeof(parseInt(producto.quantity)))
            carrito.cantidad[index].quantity =parseInt(carrito.cantidad[index].quantity) + parseInt(producto.quantity)
            
            console.log(typeof(carrito.cantidad[index].quantity))
            await fs.writeFile(this.path, JSON.stringify(carts,null,2))
            return "Producto Actualizado"
        } else {
            
            producto.id = CartManager.incrementarCartID()
            carrito.cantidad.push(producto)
            await fs.writeFile(this.path, JSON.stringify(carts,null,2))
            return "Producto Agregado"
            //Crear nuevo objeto con id y quantity y guardarlo en el carrito
        }
        
    }

}