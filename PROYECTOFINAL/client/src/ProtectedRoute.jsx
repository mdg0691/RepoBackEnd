import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./context/AuthContext"

// el componente Outlet que brinda react hace referencia al componente que esta dentro , en este caso continuara con el comp 
// que esta adentro al llamar la funcion ProtectedRouter
function ProtectedRoute() {
    const {user, isAuthenticated} = useAuth()

    if(!isAuthenticated) return <Navigate to="/Login" replace/>// coloco replace para que no vuelva a la ruta anterior para q sobreescriba 
  return <Outlet/>
}

export default ProtectedRoute