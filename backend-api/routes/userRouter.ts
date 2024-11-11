import {Router} from 'express'
import { authenticateJWT } from '../middlewares/jwtMiddleware'
import {getUser, getUserProfile} from '../controllers/userController'

const userRouter : Router = Router()

userRouter.get('/profile', authenticateJWT, getUserProfile)
userRouter.get('/user', authenticateJWT, getUser)

export default userRouter