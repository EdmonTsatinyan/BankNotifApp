import express from "express"
import authController from "../Controller/authController.js"
const authRouter = express.Router()

authRouter.post("/signIn/:phoneID", authController.logIN)

export default authRouter