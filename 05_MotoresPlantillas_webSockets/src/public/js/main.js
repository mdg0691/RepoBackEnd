 const socket = io()

const formProduct = document.getElementById("formProducto")

formProduct.addEventListener('submit', (e) => {
    e.preventDefault()
    const prodsIterador = new FormData(e.target) //transforma obj HTML en obj iterator
    //e.target es el formulario de mi aplicacion
    const prod = JSON.stringify(Object.fromEntries(prodsIterador))//transforma de obj iterator a obj simple Y LUEGO EN JSON
    console.log(prod)
    socket.emit("nuevoProducto", {prod})
})
