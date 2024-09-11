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
 * /api/auth/signIn:
 *   post:
 *     summary: User login with device ID
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deviceID:
 *                 type: string
 *                 example: "abc123"
 *                 description: Unique identifier for the device.
 *               firebaseToken:
 *                 type: string
 *                 example: "your_firebase_token_here"
 *                 description: Firebase token for the device.
 *             required:
 *               - deviceID
 *               - firebaseToken  
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
authRouter.post("/signIn", authController.logIN);

export default authRouter;
