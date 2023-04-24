import { promises as fs } from 'fs'

export class ProductManager {
    constructor(path) {
        this.path = path
    }

    // Metodo estatico para asignar id
    static incrementarID() {
        if (this.idIncrement) {
            this.idIncrement++
        } else {
            this.idIncrement = 1
        }
        return this.idIncrement
    }

    //Metodo para agregar producto
    async addProduct(product) {
            const prods = await this.getProducts()
            try{
                product.id = ProductManager.incrementarID()
                prods.push(product)
                await fs.writeFile(this.path, JSON.stringify(prods,null,2))
                return "Producto creado"
            } catch(error){
                return "Error al guardar, verificar que no haya campos vacios"
            }
        
    }

    // Metodo para obtener todos los productos
    async getProducts() {
        try{
            const prods = await fs.readFile(this.path, 'utf-8')
            return JSON.parse(prods)
        } catch (error) {
            return "Error al obtener Productos"
        }
        
    }

    //Metodo para obtener producto por id
    async getProductById(id) {
        const prodsJSON = await fs.readFile(this.path, 'utf-8')
        const prods = JSON.parse(prodsJSON)
        if (prods.some(prod => prod.id === parseInt(id))) {
            return prods.find(prod => prod.id === parseInt(id))
        } else {
            return "Producto no encontrado"
        }
    }

    //Metodo para actualizar prod
    async updateProduct(id, { title, description,code,price,status,stock,category,thumbnail}) {
        const prods = await this.getProducts()
        if (prods.some(prod => prod.id === parseInt(id))) 
            try{
                let index = prods.findIndex(prod => prod.id === parseInt(id))
                prods[index].title = title
                prods[index].description = description
                prods[index].code = code
                prods[index].price = price
                prods[index].status = true
                prods[index].stock = stock
                prods[index].category = category
                prods[index].thumbnail = thumbnail

                await fs.writeFile(this.path, JSON.stringify(prods,null,2))
                return "Producto actualizado"
            } catch (error){
                return "Producto no encontrado"
            }
    }

    //Metodo para eliminar prod 
    async deleteProduct(id) {
        const prods = await this.getProducts()
        if (prods.some(prod => prod.id === parseInt(id)))
            try{
                const prodsFiltrados = prods.filter(prod => prod.id !== parseInt(id))
                await fs.writeFile(this.path, JSON.stringify(prodsFiltrados))
                return "Producto eliminado"
            } catch(error){
                return "Producto no encontrado"
            }
    }


}