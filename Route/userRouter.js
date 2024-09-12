import express from "express";
import userController from "../Controller/userController.js";
const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User and Loan managing APIs
 */


/**
 * @swagger
 * /api/user/{deviceID}:
 *   get:
 *     summary: Get device loans
 *     tags: [Users]  
 *     parameters:
 *       - in: path
 *         name: deviceID
 *         schema:
 *           type: string
 *         required: true
 *         description: The device ID of the user
 *     responses:
 *       200:
 *         description: Successful get
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad Request
 */

userRouter.get("/:deviceID", userController.getDeviceLoans)

/**
 * @swagger
 * /api/user/addLoan:
 *   post:
 *     summary: Add a new loan for a user
 *     tags: [Users]  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Loan'
 *     responses:
 *       200:
 *         description: New Loan Created Successfully
 *       400:
 *         description: Bad Request
 */
userRouter.post("/addLoan", userController.addLoan);

/**
 * @swagger
 * /api/user/changeLoan/{loanID}:
 *   put:
 *     summary: Update an existing loan
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: loanID
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the loan to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Loan'
 *     responses:
 *       200:
 *         description: Loan Updated Successfully
 *       400:
 *         description: Bad Request
 */
userRouter.put("/changeLoan/:loanID", userController.changeLoan);

/**
 * @swagger
 * /api/user/changePaidStatus/{loanID}:
 *   put:
 *     summary: Change the paid status of a loan
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: loanID
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the loan to update
 *     responses:
 *       200:
 *         description: Updated paidStatus successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Updated paidStatus successfully!"
 *                   description: Response message
 *                 success:
 *                   type: boolean
 *                   example: true
 *                   description: Operation success status
 *                 isEneded:
 *                   type: boolean
 *                   example: true
 *                   description: Operation success status
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to update PaidStatus"
 *                   description: Response message
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Operation success status
 */
userRouter.put("/changePaidStatus/:loanID", userController.changePaidStatus);



/**
 * @swagger
 * /api/user/removeLoan/{loanID}:
 *   delete:
 *     summary: Delete Loan
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: loanID
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the loan to delete
 *     responses:
 *       200:
 *         description: Loan Removed Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: " Loan Removed successfully!"
 *                   description: Response message
 *                 success:
 *                   type: boolean
 *                   example: true
 *                   description: Operation success status
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to remove Loan"
 *                   description: Response message
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Operation success status
 */
userRouter.delete("/removeLoan/:loanID", userController.removeLoan);

export default userRouter;
