const socket = io()

const formProduct = document.getElementById("formProducto")

formProduct.addEventListener('submit', (e) => {
    e.preventDefault()
    const prodsIterador = new FormData(e.target) //transforma obj HTML en obj iterator
    //e.target es el formulario de mi aplicacion
    const prod = JSON.stringify(Object.fromEntries(prodsIterador))//transforma de obj iterator a obj simple Y LUEGO EN JSON
    console.log(prod)
    socket.emit("nuevoProducto", {prod} )
})


//Escuchar el evento listado de los productos agregados
socket.on('listado',  async (product) => {
    console.log(product)
    const productos = Object.values(product)
    console.log(productos)
    const li = document.createElement('li');
    li.innerHTML = ""
    productos.map(e => {
        li.innerHTML += `<p>${e.id} : ${e.title}</p>`
    })
})
