import { createContext, useContext, useEffect, useState} from "react";
import { logingRequest, registerRequest } from "../api/auth";

export const AuthContext = createContext() // creo contex , here It will be use to saved user data

// para no importar el  use context(que me va a permiter el uso del contexto creado) y el authContex creo la funcion useAuth
export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("useAuth mus be used whitin an AuthProvider")
    }
    return context
}


/*
-Auth provider its a component wich will envolved to another, the provider will be always executed from Auth Context
-Auth context has a propertie value where we can pass a value
const AuthProvider = ({children}) =>{
    return(
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    )
}*/


export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null) // creo un estado, cuando creo un user o un login voy a setear el set user para guardar su estado
    const [isAuthenticated,setIsAuthenticated] = useState(false) // 
    const [errors, setErrors] = useState([])



    // creo funciones singUp and SingIn  then set user and authenticated will be saved
    const singup = async (user) => {
        try {
            const res = await registerRequest(user)
            const token = res?.data?.token;
            const roles = res?.data?.userFound?.roles;
            setUser(res.data)

            setIsAuthenticated(true)
        } catch (error) {
            console.log(error.response.data)
            setErrors(error.response)
        }
    }

    const singin = async (user) => {
        try {
            const res = await logingRequest(user)
            // console.log(res.data);
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (error) {
            console.log(error);
            if(Array.isArray(error.response.data)){
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    }

    useEffect(() => {
        if(errors.length>0){
            const timer = setTimeout(() => {
                setErrors([])
            },5000)
            return() => clearTimeout(timer)
        }
    }, [errors])
    
 
    return(
        <AuthContext.Provider 
            value={{
                singup,
                singin,
                user,
                isAuthenticated,
                setIsAuthenticated,
                errors,
                }}
        >
            {children}
        </AuthContext.Provider>
    )
}