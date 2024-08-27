import express from "express"
import userController from "../Controller/userController.js"
const userRouter = express.Router()


userRouter.post("/addLoan", userController.addLoan),
userRouter.put("/changeLoan/:loanID", userController.changeLoan),
userRouter.put("/changePaidStatus/:loanID", userController.changePaidStatus)

export  default userRouter