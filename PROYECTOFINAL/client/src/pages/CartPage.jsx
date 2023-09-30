import { useState, useEffect } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { removeProductFromCart, checkout } from "../api/auth";
import { useParams } from "react-router-dom";


function CartPage() {
  // Definir el estado para almacenar los productos del carrito
  const { cartId } = useParams()
  const [cartProducts, setCartProducts] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [checkoutSuccessMessage, setCheckoutSuccessMessage] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth()


  // const cartId = user.userFound.cart[0]._id||cart[0]._id
  
  console.log(cartId);
  // Llamar a la API para obtener los productos del carrito al cargar la página
  useEffect(() => {
    const controller = new AbortController();

    const getCartProducts = async () => {
      try {
        const response = await axiosPrivate.get(`/carts/${cartId}`, {
          signal: controller.signal
        });
        console.log(response.data.response.products);
        setCartProducts(response.data.response.products);
      } catch (error) {
        console.log(error);
      }
    }

    getCartProducts();

    // Limpieza al desmontar el componente
    return () => {
      controller.abort();
    };
  }, []);
  

  const showSuccessAndHide = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000); // 3000 milisegundos (3 segundos)
  };



  // Función para eliminar un producto del carrito
  const handleRemoveFromCart = async (productId) => {
    try {
      // Llama a la API para eliminar el producto del carrito
      const removeproduct = {
        cartId,
        productId
      } 
      removeProductFromCart(removeproduct)
      // Actualiza el estado del carrito para reflejar la eliminación
      setCartProducts((prevCart) => prevCart.filter((product) => product.id_prod._id !== productId));
      console.log(cartProducts);
    } catch (error) {
      console.log(error);
    }
  };
  function calculateSubtotal(product) {
    return (product.id_prod.price * product.cantidad).toFixed(2);
  }
  
  
  // Función para calcular el precio total
  function calculateTotalPrice(cartProducts) {
    let totalPrice = 0;
    for (const product of cartProducts) {
      totalPrice += product.id_prod.price * product.cantidad;
    }
    return totalPrice.toFixed(2); // Redondea el total a 2 decimales
  }
  const handleCheckout = async() =>{
    const response = await checkout(cartId);
    setCheckoutSuccessMessage(response.data.message);
    showSuccessAndHide();
    setCartProducts([])
  }
  
  return (
    <article>
      <h2>Carrito de Compras</h2>
      {cartProducts.length ? (
        <div>
          <ul>
            {cartProducts.map((product) => (
              <li key={product.id_prod._id}>
                <strong>Título:</strong> {product.id_prod.title}<br />
                <strong>Cantidad:</strong> {product.cantidad}<br />
                <strong>Precio Unitario:</strong> {product.id_prod.price.toFixed(2)}<br />
                <strong>Subtotal:</strong> ${calculateSubtotal(product)}<br />
                {/* Resto de la información del producto */}
                <Link to={`/detail/${product.id_prod._id}`} className='Option'>Ver detalle</Link>
                <button onClick={() => handleRemoveFromCart(product.id_prod._id)}>Eliminar del carrito</button>
              </li>
            ))}
          </ul> 
          <p><strong>Total:</strong> ${calculateTotalPrice(cartProducts)}</p>
        </div>
      ) : (
        <p>No hay productos en el carrito</p>
      )}
      <button onClick={handleCheckout}>Finalizar compra</button>
      <Link to='/'>Home</Link>
      {checkoutSuccessMessage && (
        <div style={{ color: "green" }}>{checkoutSuccessMessage}</div>
      )}
    </article>
  );
}

export default CartPage;
