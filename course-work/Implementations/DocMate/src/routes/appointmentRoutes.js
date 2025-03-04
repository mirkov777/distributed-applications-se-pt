const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const auth = require('../middleware/auth');
const { validateAppointment } = require('../middleware/validators');
const handleValidation = require('../middleware/handleValidation');

/**
 * @openapi
 * tags:
 *   name: Appointments
 *   description: Appointment management
 */

/**
 * @openapi
 * /appointments:
 *   post:
 *     summary: Create a new appointment.
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               client_id:
 *                 type: integer
 *               doctor_id:
 *                 type: integer
 *               date:
 *                 type: string
 *                 format: date-time
 *               reason:
 *                 type: string
 *                 maxLength: 255
 *               fee:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Appointment created.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 */
router.post('/', auth, validateAppointment, handleValidation, appointmentController.createAppointment);

/**
 * @openapi
 * /appointments:
 *   get:
 *     summary: Get all appointments with pagination.
 *     tags: [Appointments]
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
 *         description: List of appointments.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 */
router.get('/', auth, appointmentController.getAppointments);

/**
 * @openapi
 * /appointments/search:
 *   get:
 *     summary: Search appointments by date.
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Appointment date to search (YYYY-MM-DD).
 *     responses:
 *       200:
 *         description: List of matching appointments.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 */
router.get('/search', auth, appointmentController.searchAppointments);

/**
 * @openapi
 * /appointments/{id}:
 *   get:
 *     summary: Get an appointment by ID.
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Appointment ID.
 *     responses:
 *       200:
 *         description: Appointment data.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Appointment not found.
 */
router.get('/:id', auth, appointmentController.getAppointmentById);

/**
 * @openapi
 * /appointments/{id}:
 *   put:
 *     summary: Update an appointment by ID.
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Appointment ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               client_id:
 *                 type: integer
 *               doctor_id:
 *                 type: integer
 *               date:
 *                 type: string
 *                 format: date-time
 *               reason:
 *                 type: string
 *                 maxLength: 255
 *               fee:
 *                 type: number
 *                 format: float
 *               status:
 *                 type: string
 *                 maxLength: 50
 *     responses:
 *       200:
 *         description: Appointment updated.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Appointment not found.
 */
router.put('/:id', auth, validateAppointment, handleValidation, appointmentController.updateAppointment);

/**
 * @openapi
 * /appointments/{id}:
 *   delete:
 *     summary: Delete an appointment by ID.
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Appointment ID.
 *     responses:
 *       200:
 *         description: Appointment deleted.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Appointment not found.
 */
router.delete('/:id', auth, appointmentController.deleteAppointment);

module.exports = router;