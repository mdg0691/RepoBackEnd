import path from "path"
import { fileURLToPath } from "url"
import bcrypt, { genSaltSync } from 'bcrypt'

export const hashData = async(data) =>{
    return bcrypt.hash(data, genSaltSync(10))
}

export const compereData = async(data, hashData) =>{
    return bcrypt.compareSync(data,hashData)
} 

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default __dirname
