const express = require('express');
const {register, login, getMe, logout} = require('../controllers/auth');

/**
 *  @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - _id
 *          - name
 *          - tel
 *          - email
 *          - password
 *          - createAt
 *        properties:
 *          _id:
 *            type: string
 *            format: uuid
 *            description: The auto-generated id of the user
 *          name:
 *            type: string
 *            description: Name-Surname
 *          tel:
 *            type: string
 *            description: Phone number
 *          email:
 *            type: string
 *            description: Email
 *          password:
 *            type: string
 *            description: Password must be at least 6 characters long
 *          createdAt:
 *            type: date
 *            description: The auto-generated date and time of creation
 *        example: 
 *          _id: 661d800402e461dc8545fb37
 *          name: "testCustomer"
 *          tel: "0987654321"
 *          email: "testCustomer@gmail.com"
 *          role: "user"
 *          password: "$2a$10$Dwu88NO48AJ4.1WpereT6uVjlX6aIx8rraTehg6ZVVKX3PQsRd23W"
 *          createdAt: 2024-04-15T19:29:08.333+00:00
 */ 
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: The authentication API
 */
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register new user account
 *     tags: [Authentication]
 *     requestBody:
*        required: true
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Successfully created account
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login to user account
 *     tags: [Authentication]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successfully login to account
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Please provide email and password
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logout user account
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Successfully logout account
 */
/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current logged in user account
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Successfully get current logged in user account
 *       500:
 *         description: Unauthorized
 */

const router = express.Router();

const {protect} = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/logout', logout);

module.exports = router;