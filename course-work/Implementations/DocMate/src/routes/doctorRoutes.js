const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const auth = require('../middleware/auth');
const { validateDoctor } = require('../middleware/validators');
const handleValidation = require('../middleware/handleValidation');

/**
 * @openapi
 * tags:
 *   name: Doctors
 *   description: Doctor management
 */

/**
 * @openapi
 * /doctors:
 *   post:
 *     summary: Create a new doctor.
 *     tags: [Doctors]
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
 *               specialization:
 *                 type: string
 *                 maxLength: 100
 *               email:
 *                 type: string
 *                 maxLength: 100
 *               phone:
 *                 type: string
 *                 maxLength: 15
 *               years_of_exp:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Doctor created.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 */
router.post('/', auth, validateDoctor, handleValidation, doctorController.createDoctor);

/**
 * @openapi
 * /doctors:
 *   get:
 *     summary: Get all doctors with pagination.
 *     tags: [Doctors]
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
 *         description: List of doctors.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 */
router.get('/', auth, doctorController.getDoctors);

/**
 * @openapi
 * /doctors/search:
 *   get:
 *     summary: Search doctors by last name.
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: last_name
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor's last name to search for.
 *     responses:
 *       200:
 *         description: List of matching doctors.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 */
router.get('/search', auth, doctorController.searchDoctors);

/**
 * @openapi
 * /doctors/{id}:
 *   get:
 *     summary: Get a doctor by ID.
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Doctor ID.
 *     responses:
 *       200:
 *         description: Doctor data.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Doctor not found.
 */
router.get('/:id', auth, doctorController.getDoctorById);

/**
 * @openapi
 * /doctors/{id}:
 *   put:
 *     summary: Update a doctor by ID.
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Doctor ID.
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
 *               specialization:
 *                 type: string
 *                 maxLength: 100
 *               email:
 *                 type: string
 *                 maxLength: 100
 *               phone:
 *                 type: string
 *                 maxLength: 15
 *               years_of_exp:
 *                 type: integer
 *               rating:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Doctor updated.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Doctor not found.
 */
router.put('/:id', auth, validateDoctor, handleValidation, doctorController.updateDoctor);

/**
 * @openapi
 * /doctors/{id}:
 *   delete:
 *     summary: Delete a doctor by ID.
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Doctor ID.
 *     responses:
 *       200:
 *         description: Doctor deleted.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Doctor not found.
 */
router.delete('/:id', auth, doctorController.deleteDoctor);

module.exports = router;
