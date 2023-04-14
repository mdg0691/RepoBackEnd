// practicar con el modulo cripto , vamos a encriptar y desencriptar 
// claves

import crypto, { Cipher } from 'crypto' //de la pagina de node importo  https://nodejs.org/api/crypto.html

/*Proceso de encriptacion

Algoritmo: Forma de encriptar
key:valor unico
IV: Vector de inicializacion que añade complejidad al codigo encriptado

*/

// console.log(crypto.getCiphers())
// console.log(crypto.randomBytes(32))
// console.log(crypto.randomBytes(16))

const algoritmo = 'aes-256-cbc'
const key = crypto.randomBytes(32)
const iv = crypto.randomBytes(16)

const encriptar = (password) =>{
    const cipher = crypto.createCipheriv(algoritmo, Buffer.from(key), iv)
    cipher.update(password) 
    let encriptacion= cipher.final()
    return encriptacion
    // return console.log(encriptacion.toString('hex'))
}



const desencriptar = (passwordE) =>{
    const decipher = crypto.createDecipheriv(algoritmo, Buffer.from(key), iv) // creo mi desencriptador
    decipher.update(passwordE) //preparo mi obj decipher para desencriptar mi contraseña
    let desencriptacion= decipher.final()//
    return desencriptacion.toString()
}

const passwordEncriptado = encriptar('coderhouse')
console.log(desencriptar(passwordEncriptado))