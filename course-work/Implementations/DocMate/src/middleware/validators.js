const { body } = require('express-validator');

exports.validateClient = [
  body('first_name')
    .isString()
    .isLength({ min: 1, max: 50 })
    .withMessage('First name is required and must be at most 50 characters.'),
  body('last_name')
    .isString()
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name is required and must be at most 50 characters.'),
  body('email')
    .isEmail()
    .isLength({ max: 100 })
    .withMessage('Valid email is required with max 100 characters.'),
  body('phone')
    .isString()
    .isLength({ min: 1, max: 15 })
    .withMessage('Phone is required and must be at most 15 characters.'),
  body('age')
    .isInt({ min: 0 })
    .withMessage('Age is required and must be an integer.')
];

exports.validateDoctor = [
  body('first_name')
    .isString()
    .isLength({ min: 1, max: 50 })
    .withMessage('First name is required and must be at most 50 characters.'),
  body('last_name')
    .isString()
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name is required and must be at most 50 characters.'),
  body('specialization')
    .isString()
    .isLength({ min: 1, max: 100 })
    .withMessage('Specialization is required and must be at most 100 characters.'),
  body('email')
    .isEmail()
    .isLength({ max: 100 })
    .withMessage('Valid email is required with max 100 characters.'),
  body('phone')
    .isString()
    .isLength({ min: 1, max: 15 })
    .withMessage('Phone is required and must be at most 15 characters.'),
  body('years_of_exp')
    .isInt({ min: 0 })
    .withMessage('Years of experience is required and must be an integer.')
];

exports.validateAppointment = [
  body('client_id')
    .isInt()
    .withMessage('Client ID must be an integer.'),
  body('doctor_id')
    .isInt()
    .withMessage('Doctor ID must be an integer.'),
  body('date')
    .isISO8601()
    .toDate()
    .withMessage('Appointment date must be a valid date.'),
  body('reason')
    .isString()
    .isLength({ min: 1, max: 255 })
    .withMessage('Reason is required and must be at most 255 characters.'),
  body('fee')
    .isFloat({ min: 0 })
    .withMessage('Fee is required and must be a number.'),
  body('status')
    .optional()
    .isString()
    .isLength({ min: 1, max: 50 })
    .withMessage('Status must be at most 50 characters.')
];
