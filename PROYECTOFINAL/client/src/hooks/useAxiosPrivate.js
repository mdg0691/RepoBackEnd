import { axiosPrivate } from '../api/axios'
import { useEffect } from 'react'
import { useAuth } from "../context/AuthContext"


const useAxiosPrivate = () =>{
    const { isAuthenticated,user } = useAuth()

    // console.log(user);
    useEffect(() => {

        const requestIntercep = axiosPrivate.interceptors.request.use(
            
            config =>{
                if(!config.headers['authorization']) {
                    config.headers['authorization'] = `Bearer ${user?.token}` 
                }
                return config
            }, (error) => Promise.reject(error)
        )

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercep);
        }
    },[isAuthenticated])
    return axiosPrivate
}

export default useAxiosPrivate