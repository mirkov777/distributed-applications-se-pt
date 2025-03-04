const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const auth = require('../middleware/auth');
const { validateClient } = require('../middleware/validators');
const handleValidation = require('../middleware/handleValidation');

/**
 * @openapi
 * tags:
 *   name: Clients
 *   description: Client management
 */

/**
 * @openapi
 * /clients:
 *   post:
 *     summary: Create a new client.
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 maxLength: 50
 *               last_name:
 *                 type: string
 *                 maxLength: 50
 *               email:
 *                 type: string
 *                 format: email
 *                 maxLength: 100
 *               phone:
 *                 type: string
 *                 maxLength: 15
 *               age:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Client created.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 */
router.post('/', auth, validateClient, handleValidation, clientController.createClient);

/**
 * @openapi
 * /clients:
 *   get:
 *     summary: Get all clients with pagination.
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page.
 *     responses:
 *       200:
 *         description: List of clients.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 */
router.get('/', auth, clientController.getClients);

/**
 * @openapi
 * /clients/search:
 *   get:
 *     summary: Search clients by first name.
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: first_name
 *         required: true
 *         schema:
 *           type: string
 *         description: First name to search.
 *     responses:
 *       200:
 *         description: List of matching clients.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 */
router.get('/search', auth, clientController.searchClients);

/**
 * @openapi
 * /clients/{id}:
 *   get:
 *     summary: Get a client by ID.
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Client ID.
 *     responses:
 *       200:
 *         description: Client data.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 */
router.get('/:id', auth, clientController.getClientById);

/**
 * @openapi
 * /clients/{id}:
 *   put:
 *     summary: Update a client by ID.
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Client ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 maxLength: 50
 *               last_name:
 *                 type: string
 *                 maxLength: 50
 *               email:
 *                 type: string
 *                 format: email
 *                 maxLength: 100
 *               phone:
 *                 type: string
 *                 maxLength: 15
 *               age:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Client updated.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 */
router.put('/:id', auth, validateClient, handleValidation, clientController.updateClient);

/**
 * @openapi
 * /clients/{id}:
 *   delete:
 *     summary: Delete a client by ID.
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Client ID.
 *     responses:
 *       200:
 *         description: Client deleted.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 */
router.delete('/:id', auth, clientController.deleteClient);

module.exports = router;
