class ProductManager {
    constructor() {
      this.products = [];
    }
    //Metodos de la clase
  
    addProduct = (product) => {
  
      if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
        return console.log(`Faltan datos para agregar el producto ${product.title} `)
      }
  
      const equalProductCode = this.products.filter((productLoaded) => productLoaded.code == product.code)
  
      if (equalProductCode == 0) {
        product.id = this.products.length + 1;
        this.products.push(product);
      } else {
        return console.log(`El Producto ${product.title} repite el campo code`)
      }
  
  
    }
    getProducts = () => {
      console.log(this.products);
    }
    getProductById = (productId) => {
      const findProductId = this.products.filter((findId) => findId.id == productId);
  
      if (findProductId != 0) {
        return findProductId;
      }
      else {
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
    }
  
  }
  const product1 = new Product("tomate", "rojo", "20", "img1", "001", "40");
  const product2 = new Product("pera", "amarilla", "30", "img2", "002", "30");
  const product3 = new Product("manzana", "verde", "10", "img3", "003", "50");
  const product4 = new Product("naraja", "dulce", "10", "img4", "003", "50");
  const product5 = new Product("frutilla", "", "100", "img5", "004", "50");
  const product6 = new Product("kiwi", "verde", "35", "img6", "006", "50");
  
  const ProductManager1 = new ProductManager;
  const ProductManager2 = new ProductManager;
  
  ProductManager2.addProduct(product1);
  ProductManager2.addProduct(product2);
  ProductManager2.addProduct(product3);
  ProductManager2.addProduct(product4);
  ProductManager2.addProduct(product5);
  ProductManager2.addProduct(product6);
  
  
  console.log(ProductManager2.getProducts())
  console.log(ProductManager2.getProductById(4))
  console.log(ProductManager2.getProductById(10))