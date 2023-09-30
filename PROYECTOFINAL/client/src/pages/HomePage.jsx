import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import { axiosPrivate } from "../api/axios";

const HomePage = () => {
  
    const { setIsAuthenticated } = useAuth()
    const navigate = useNavigate();

   

    const logout = async () => {
        // if used in more components, this should be in context 
        const response = await axiosPrivate.post('/auth/logout')      
        console.log(response);
        setIsAuthenticated(false);
        navigate('/login');
    }

    return (
        <section>
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            <br />
            <Link to="/editor">Go to the Editor page</Link>
            <br />
            <Link to="/admin">Go to the Admin page</Link>
            <br />
            <Link to="/products">Go to the Products</Link>
            <br />
            <Link to="/linkpage">Go to the link page</Link>
            <br />
            <Link to="/admin/products">Go to the Admin Product page</Link>
            <div className="flexGrow">
                <button onClick={logout}>Sign Out</button>
            </div>
        </section>
    )
}

export default HomePage