import axios from 'axios'

export  const instance = axios.create({
    baseURL:'http://localhost:8080/api',
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    // withCredentials:true
})

export const  axiosPrivate =  axios.create({
    baseURL:'http://localhost:8080/api',
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
})
