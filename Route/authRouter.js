import express from "express";
import authController from "../Controller/authController.js";
const authRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authorization managing API
 */

/**
 * @swagger
 * /api/auth/signIn/{phoneID}:
 *   post:
 *     summary: User login with phone ID
 *     tags: [Auth]  
 *     parameters:
 *       - in: path
 *         name: phoneID
 *         schema:
 *           type: string
 *         required: true
 *         description: The phone ID of the user
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad Request
 */
authRouter.post("/signIn/:phoneID", authController.logIN);

export default authRouter;
