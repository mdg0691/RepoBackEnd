import { instance } from './axios'


export const registerRequest = user => instance.post(`/auth/singup`,user)

export const logingRequest = user => instance.post(`/auth/signin`,user)

export const addCartRequest = cart => instance.post(`/carts/addtocart`,cart)

export const updatedCartRequest = cart => instance.post(`/carts/updatedcart`,cart)

export const removeProductFromCart = removeproduct => instance.put(`/carts/removeproduct`,removeproduct)

export const checkout = (idCart) => instance.post(`/carts/${idCart}/purchase`)

