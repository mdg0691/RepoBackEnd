import bcrypt, { genSaltSync } from "bcrypt"

export const hashData = async (data) => {
  return bcrypt.hash(data, genSaltSync(10))
}

export const compereData = async (data, hashData) => {
  return bcrypt.compareSync(data, hashData)
}
