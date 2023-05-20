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
socket.on('listado',  async (prod) => {
    const products = Object.values(prod)
    console.log(products)
    let placeholder = document.querySelector("#data-output")
    let out =""
    console.log("listando productos agregados")
    for (let element of products){

        for (let product of element){ 
            out += `
            <tr>
                <th scope="row">${product.id}</th>
                <td>${product.title}</td>
                <td>${product.description}</td>
                <td>${product.price}</td>
                <td>${product.thumbnail}</td>
                <td>${product.code}</td>
                <td>${product.stock}</td>
                <td>
                <button type="button" id ="delete" onclick="deleteProduct()" value= "${product.id}" class="btn btn-primary">Delete</button>
                </td>
            </tr>
            `;
            placeholder.innerHTML = out
        }    
    }
    
})

function deleteProduct() {
    const deleteProdId  = document.getElementById("delete").value
    socket.emit("delete-product", {deleteProdId})
    deleteProdId =""
}
// deleteProduct.addEventListener("click", (e) => {
//     e.preventDefault()
//     console.log(e.value)
    
// })
