import { promises as fs } from 'fs'
class ProductManager {
  constructor(path) {
    this.path = path;
  }
  
  async addProduct(product) {
    const products = await this.getProducts()
 
    const equalProductCode = products.filter((productLoaded) => productLoaded.code == product.code)
    if (equalProductCode == 0) {
      products.push({ ...product })
    }
    //  console.log(information)
 
    try {
      await fs.writeFile(this.path, JSON.stringify(products, null, 2))
    } catch {
      return console.log(`Error al guardar`)
    }
  }
 
 
  async getProducts() {
    try {
      const products = await fs.readFile(this.path, 'utf-8')
      //console.log(products)
      const prods = JSON.parse(products)
      // console.log(prods)
      return (prods)
    } catch (error) {
      return []
    }
  }
 
 
 
  async getProductById(productId) {
    try {
      const products = await this.getProducts()
      return products.filter((findId) => findId.id == productId)
    } catch (error) {
      return console.log("Not found")
    }
  }
 
 
  async deleteProductById(productId) {
    try {
      const products = await this.getProducts()
      const productsWOutId = products.filter((findId) => findId.id !== productId)
      console.log(productsWOutId)
      await fs.writeFile(this.path, JSON.stringify(productsWOutId, null, 2))
 
    } catch (error) {
      return console.log("Not found")
    }
  }
  async updateProduct(productId, stockToUpdate) {
    try {
      const products = await this.getProducts()
      const productToUpdate = products.filter((findId) => findId.id == productId)
      console.log(productToUpdate[0].stock)
      productToUpdate[0].stock = stockToUpdate
      // console.log(products)
      await fs.writeFile(this.path, JSON.stringify(products, null, 2))
    } catch (error) {
      return console.log("Not found")
    }
  }
 
}
 
class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.id = Product.incrementID()
  }
  static incrementID() {
    if (this.idIncrement) {
      this.idIncrement++
    } else {
      this.idIncrement = 1
    }
    return this.idIncrement
  }
 
}
const product1 = new Product("tomate", "rojo", "20", "img1", "001", "40");
const product2 = new Product("pera", "amarilla", "30", "img2", "002", "30");
const product3 = new Product("manzana", "verde", "10", "img3", "003", "50");
const product4 = new Product("naraja", "dulce", "10", "img4", "003", "50");
const product5 = new Product("frutilla", "roja", "100", "img5", "004", "50");
const product6 = new Product("kiwi", "verde", "35", "img6", "006", "50");
 
//   const ProductManager1 = new ProductManager;
const ProductManager2 = new ProductManager('./info.txt');
 
await ProductManager2.addProduct(product1);
await ProductManager2.addProduct(product2);
await ProductManager2.addProduct(product3);
await ProductManager2.addProduct(product4);
await ProductManager2.addProduct(product5);
await ProductManager2.addProduct(product6);
 
//console.log(await ProductManager2.getProducts())
//console.log(product5)
// console.log(ProductManager2.getProducts())
await ProductManager2.updateProduct(5, 500)
  // console.log(ProductManager2.getProductById(10))
