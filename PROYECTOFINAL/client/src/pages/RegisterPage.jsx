import { useForm } from 'react-hook-form' // me permite decirle a react que tengo un form y que maneje el cambio de estado como la validacion
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage(){
    const { register, handleSubmit, 
        formState:{ errors }
    } = useForm()// me da algunas funciones que puedo reutilizar de momento utilizo en register
    // con esto no tendria que crear un estado
    const { singup, isAuthenticated, errors: registerErrors} = useAuth()
    
    const navigate = useNavigate() // me permite navegar entre rutas
    
    // utilizo use Effect para que cuando is Authenticated(llamado de useAuth-> use Context) cambie de estado , navegue a otras rutas
    useEffect(() => {
        if (isAuthenticated) navigate('/login')
    }, [isAuthenticated,navigate])


    const onSubmit = handleSubmit( async (values) => {
        
        await singup(values)                
    })
 
    return(
        <div>
            {
                registerErrors.map((error,i) => (
                    <div key={i}>
                        {error}
                    </div>
                ))
            }
            <h1>REGISTER</h1>

            <form onSubmit={ onSubmit }>
                <input type="text" placeholder="firstname"{... register("first_name",{required:true})}/>
                {
                    errors.first_name &&(
                        <p>
                            name is required
                        </p>
                    )
                }
                <input type="text" placeholder="lastname"{... register("last_name",{required:true})}/>
                {
                    errors.last_name &&(
                        <p>
                            lastname is required
                        </p>
                    )
                }
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
                <button type='submit'>Register</button>
            </form>
            <p>
                Don´t you have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    )
}

export default RegisterPage