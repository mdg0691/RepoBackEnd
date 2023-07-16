import { Router } from 'express'
import {
  findAllUsers,
  findOneUser
} from '../controllers/users.controller.js'

const userRouter = Router()

userRouter.get('/', findAllUsers)
userRouter.get('/:id', findOneUser)

export default userRouter