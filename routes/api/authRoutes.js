const express = require('express');
const router = express.Router();

const ctrlWrapper = require('../../middlewares/ctrlWrapper');

const {
  postUser,
  postLoggedUser,
  postVerifiedUser,
  getUserVerification,
} = require('../../controllers/auth/authControllers');

const {
  userRegValidation,
  userLoginValidation,
  userVerifyValidation,
} = require('../../middlewares/authValidation');

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Provides user registration, gives verification token and sends verification message to user's email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name.
 *                 example: Nadiia Doe
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: "polly@mail.com"
 *               password:
 *                 type: string
 *                 description: The user's password to login the application.
 *                 example: DouPolly*123
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: The user's name.
 *                       example: Nadiia Doe
 *                     email:
 *                       type: string
 *                       description: The user's email.
 *                       example: "polly@mail.com"
 */
router.post('/register', userRegValidation, ctrlWrapper(postUser));

/**
 * @swagger
 * /api/auth/verify/:verificationToken:
 *   get:
 *     summary: Sets the user verification status in true on server side.
 *     parameters:
 *       - in: path
 *         name: verificationToken
 *         type: string
 *         required: true
 *         description: Verification ID of the user to pass the registration.
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Verification status.
 *                   example: Verification is successful
 */
router.get('/verify/:verificationToken', ctrlWrapper(getUserVerification));

/**
 * @swagger
 * /api/auth/verify:
 *   post:
 *     summary: Checks if user is verified. In case if user didn't pass the verification re-sends verification message on user's email when user sends his email in request.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: "polly@mail.com"
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Verification status.
 *                   example: Verification email sent
 */
router.post('/verify', userVerifyValidation, ctrlWrapper(postVerifiedUser));

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Provides user login in application.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: "polly@mail.com"
 *               password:
 *                 type: string
 *                 description: The user's password to login the application.
 *                 example: DouPolly*123
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The user's ID.
 *                       example: 64450b66b62acbe0e8144e25
 *                     name:
 *                       type: string
 *                       description: The user's name.
 *                       example: Nadiia Doe
 *                     email:
 *                       type: string
 *                       description: The user's email.
 *                       example: "polly@mail.com"
 *                     verify:
 *                       type: boolean
 *                       description: Shows user's verify status.
 *                       example: false
 *                     token:
 *                       type: string
 *                       description: The user's access token.
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzcwYmE2ZjUxZmNlYzMzY2M2NzZiYiIsImlhdCI6MTY4MTMyOTE1MiwiZXhwIjoxNjgxNDE1NTUyfQ.wv9sAH85K6NmXjamFF0lpCAIK6UseTFKdqMtdaFY9FM
 */
router.post('/login', userLoginValidation, ctrlWrapper(postLoggedUser));

module.exports = router;
