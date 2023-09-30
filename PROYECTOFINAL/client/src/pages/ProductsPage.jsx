import { useState, useEffect } from "react"
// import { instance } from "../api/axios"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { Link } from 'react-router-dom'
function ProductsPage() {
  
  const [products, setProducts] = useState()
  const axiosPrivate= useAxiosPrivate()
  useEffect(() => {
    let isMounted = true
        const controller = new AbortController() // axios property -> we use to cancel the request if the componente is unmonted-> avoid to have any pending request
        const  getProducts = async () =>{
            try {
                const response = await axiosPrivate.get('/products',{
                    signal: controller.signal
                })
                console.log(response.data.allProducts);
                isMounted && setProducts (response.data.allProducts)// ifMounted is true then setUser with the responsa data

            } catch (error) {
                console.log(error)
            }
        }
        getProducts()// we call the function to initialize .. useEffect doesnt allow to use async function this is the reason to create a new function call getUsers()

        // clean up function of useEffect
        return () =>{
            isMounted = false
            controller.abort() 
        }
  },[])

    return (
      <article>
      <Link to='/'>Home</Link>
      <h2>Product List</h2>
      {products?.length
          ? (
              <ul>
                  {products.map((product, i) =>
                    <li key={product._id}>
                    <strong>Título:</strong> {product.title}<br />
                    <strong>Price:</strong> $ {product.price}<br />
                    <strong>Stock:</strong>  {product.stock}<br />
                    <Link to={`/detail/${product._id}`} className='Option'>Ver detalle</Link>
                  </li>
                    )}
              </ul>
          ) : <p>Not products to display</p>
      }
  </article>
  )
}

export default ProductsPage
