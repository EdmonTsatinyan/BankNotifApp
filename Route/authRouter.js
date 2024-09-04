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
 * /api/auth/signIn/{deviceID}:
 *   post:
 *     summary: User login with device ID
 *     tags: [Auth]  
 *     parameters:
 *       - in: path
 *         name: deviceID
 *         schema:
 *           type: string
 *         required: true
 *         description: The device ID of the user
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
authRouter.post("/signIn/:deviceID", authController.logIN);

export default authRouter;
