import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext"
import { useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
function LoginPage(){
    const { register, handleSubmit,
        formState:{ errors }
    } = useForm()
    
    const {singin,isAuthenticated, errors: loginErrors} = useAuth();

    const navigate = useNavigate() // me permite navegar entre rutas
    
    // utilizo use Effect para que cuando is Authenticated(llamado de useAuth-> use Context) cambie de estado , navegue a otras rutas
    useEffect(() => {
        if (isAuthenticated) navigate('/')//navigate to homePage"/"
    }, [isAuthenticated,navigate])

    const onSubmit = handleSubmit( async data => {
        await singin(data)
    }) 
    return(
        <div>
           {
                loginErrors.map((error,i) => (
                    <div key={i}>
                        {error}
                    </div>
                ))
            }
            <h1>LOGIN</h1>
            <form onSubmit={onSubmit}>
                <input type="email" placeholder="email"{... register("email",{required:true})}/>
                {
                    errors.email &&(
                        <p>
                            email is required
                        </p>
                    )
                }
                <input type="password" placeholder="password" {... register("password",{required:true})}/>
                {
                    errors.password &&(
                        <p>
                            password is required
                        </p>
                    )
                }
                <button type='submit'>Login</button>
            </form>
            <p>
                Don´t you have an account? <Link to="/register">Sign up</Link>
            </p>
        </div>
    )
}

export default LoginPage