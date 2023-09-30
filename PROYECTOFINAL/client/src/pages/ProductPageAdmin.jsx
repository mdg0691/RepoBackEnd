import { useState, useEffect } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { useAuth } from '../context/AuthContext';
import { Link } from "react-router-dom";
function ProductsPageAdmin() {
  
  const [products, setProducts] = useState()
  const axiosPrivate= useAxiosPrivate()

  const { user } = useAuth()
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
  const handleProductDelete = async (productId) => {
    console.log(productId);
    try {
      console.log(user.userFound);
      const response = await axiosPrivate.delete(`/products/${productId}`,{
        data: user.userFound
      });
      console.log(response.data); // Log the response from the server
      // Filtra los usuarios para eliminar el usuario con el userId especificado
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
      
    } catch (error) {
      console.error(error);
    }
  };

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
                    <button onClick={() => handleProductDelete(product._id)}>
                    Delete
                    </button>
                  </li>
                    )}
              </ul>
          ) : <p>Not products to display</p>
      }
      
  </article>
  )
}

export default ProductsPageAdmin
