import productModel from '../models/Products.js'

// Función para generar un código de producto único
function generateProductCode() {
  var code = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  for (var i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

// Lista de categorías y productos
var categories = {
  lacteos: ['Leche', 'Queso', 'Yogurt'],
  fiambres: ['Jamon', 'Mortadela'],
  carniceria: ['Lomo', 'Cerdo', 'Queperi', 'Costilla', 'Chorizo', 'Morcilla'],
  panaderia: ['Pan', 'Facturas', 'Chipa', 'Churros'],
  verduras: ['Tomate', 'Cebolla', 'Pimiento', 'Zapallo', 'Papa'],
  frutas: ['Naranja', 'Mandarina', 'Manzana', 'Pera', 'Uva', 'Cereza'],
  bebidas: ['Agua', 'Refresco', 'Jugo']
};

// Generar una lista de productos aleatorios
var products = [];
var productId = 1;
for (var category in categories) {
  if (categories.hasOwnProperty(category)) {
    var productList = categories[category];
    for (var i = 0; i < productList.length; i++) {
      var product = {
        title: productList[i],
        description: 'Descripción de ' + productList[i],
        code: generateProductCode(),
        category: category,
        price: Math.random() * 100,
        stock: Math.floor(Math.random() * 100),
        status: true,
        thumbnail: []
      };
      products.push(product);
      productId++;
    }
  }
}



// Insertar los productos en la colección 'productos'

  productModel.insertMany(products, (err, result) => {
    if (err) {
      console.error('Error al insertar los productos:', err);
    } else {
      console.log('Se insertaron', result.insertedCount, 'productos en la colección "productos".');
    }
    client.close();
  })
