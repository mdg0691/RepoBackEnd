import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import ProductsPage from "./pages/ProductsPage";
import ProductsPageAdmin from "./pages/ProductPageAdmin";
import ProductDetailPage from "./pages/productDetailPage"; 
import ProtectedRoute from "./ProtectedRoute";
import AdminPage from "./pages/AdminPage";
function App() {
  return (
    // importo auth provider y llamo para poder ejecutarlo
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          

          <Route element={<ProtectedRoute/>}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/products" element={<ProductsPageAdmin />} />
            <Route path="/detail/:productId" element={<ProductDetailPage/>} />
            <Route path="/carts/:cartId" element={<CartPage />} />
            <Route path="/message" element={<h1>Mensaje</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
