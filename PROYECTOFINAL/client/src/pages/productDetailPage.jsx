import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useAuth } from '../context/AuthContext';
import { addCartRequest, updatedCartRequest } from "../api/auth";

function ProductDetailPage() {
  const { productId } = useParams();
  const [cart, setCart] = useState(false)
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Inicializar la cantidad en 1
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  

  const { user } = useAuth()

  useEffect(() => {
    const controller = new AbortController();

    const getProductDetails = async () => {
      try {
        const response = await axiosPrivate.get(`/products/${productId}`, {
          signal: controller.signal,
        });
        console.log(response.data.response);
        setProduct(response.data.response);
      } catch (error) {
        console.error(error);
      }
    };

    getProductDetails();

    return () => {
      controller.abort();
    };
  }, [axiosPrivate, productId]);

  // Función para actualizar la cantidad
  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  //timer
  const showSuccessAndHide = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000); // 3000 milisegundos (3 segundos)
  };

  const userId = user.userFound._id
  // setCart(user.userFound.cart)
  const addToCart = async () => {
    const controller = new AbortController();
    try {
      // Realiza la solicitud para obtener los datos del usuario
      const response = await axiosPrivate.get(`/users/${userId}`, {
        signal: controller.signal,
      });
      console.log(response);
      // Verifica si el producto ya está en el carrito
      const productInCart = response.data.user.cart[0];
      
      setCart(response.data.user.cart)
      
      // console.log(cartId);
      // console.log(response.data.user.cart[0].products[0].id_prod._id);
      if(productInCart){
        const cartId=productInCart._id
        console.log(cartId);
        const productFound = productInCart.products.find(
          (product) => product.id_prod._id === productId
        )
          if (productFound) {
            console.log("Producto encontrado en el carrito, actualiza la cantidad");
            // Producto encontrado en el carrito, actualiza la cantidad
            const updateQuantity = quantity + productFound.cantidad;
            const updatedProducts = productInCart.products.map((product) =>
              product.id_prod._id === productId
                ? { ...product, cantidad: updateQuantity }
                : product
            );

            const newProduct = {
              cartId: cartId,
              userId: userId,
              products: updatedProducts,
            };

            updatedCartRequest(newProduct);
            showSuccessAndHide();
          } else {
            console.log("Producto no encontrado en el carrito, agrégalo");
            // Producto no encontrado en el carrito, agrégalo
            const addToCart = {
              id_prod: { _id: productId },
              cantidad: quantity,
            };
            const newProducts = [...productInCart.products, addToCart];

            const newProduct = {
              cartId: cartId,
              userId: userId,
              products: newProducts,
            };

            updatedCartRequest(newProduct);
          }
      } else {
          console.log("si el carrito no existe creo uno y agrego el carrito");
          // Si el carrito no existe creo uno y agrego el producto
          const newProduct = {
            "userId": userId,
            "products": [
              {
                "id_prod": productId,
                "cantidad": quantity,
              }
            ]
          }
          // request imported from auth api axios 
          addCartRequest(newProduct)
        }
        
      
      // Continúa con la lógica después de la solicitud Axios aquí, si es necesario.
      // addCartRequest(cart)
    } catch (error) {
      console.error(error);
      // Maneja el error aquí, si es necesario.
    }
  };
  return (
    <article>
      <h2>Product Detail</h2>
      {product ? (
        <div>
          <strong>Title:</strong> {product.title}<br />
          <strong>Price:</strong> $ {product.price}<br />
          <strong>Stock:</strong> {product.stock}<br />
          <div>
            <strong>Quantity:</strong>{" "}
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min={1}
              max={product.stock}
            />
          </div>
          {/* Aquí puedes mostrar otros detalles del producto si es necesario */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
            
      <button onClick={addToCart}>Agregar al carrito</button>
      <Link to='/'>Home</Link>
       <div>
      {(!cart || cart.length === 0) ? (
        // El carrito está vacío o no existe, ocultar el botón
        null // o puedes renderizar otro componente o mensaje en lugar del botón
      ) : (
        // El carrito tiene elementos, mostrar el botón
        <button onClick={() => navigate(`/carts/${cart[0]._id}`)}>Carrito de Compras</button>
      )}
    </div>
      {/* <button onClick={() => navigate("/carts")}>Carrito de Compras</button> */}

      {showSuccessMessage && (
        <div style={{ color: "green" }}>Producto agregado al carrito con éxito.</div>
      )}
    </article>
  );
}

export default ProductDetailPage;
