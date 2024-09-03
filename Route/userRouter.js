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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paidStatus:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Updated paidStatus successfully
 *       400:
 *         description: Bad Request
 */
userRouter.put("/changePaidStatus/:loanID", userController.changePaidStatus);

export default userRouter;
