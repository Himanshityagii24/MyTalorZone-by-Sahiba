const express = require('express');
const { body, validationResult } = require('express-validator');
const { signupUser,loginUser } = require('../services/UserServices');

const router = express.Router();

router.post(
    '/signup',
    [
        body('name').notEmpty().withMessage('Name is required.'),
        body('email').isEmail().withMessage('Invalid email address.'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
        body('phoneNumber').isMobilePhone().withMessage('Invalid phone number.'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password, phoneNumber } = req.body;
        const result = await signupUser({ name, email, password, phoneNumber });

        if (result.success) {
            return res.status(201).json({ message: result.message });
        } else {
            return res.status(400).json({ message: result.message });
        }
    }
);
router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Invalid email address.'),
        body('password').notEmpty().withMessage('Password is required.'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const result = await loginUser({ email, password });

        if (result.success) {
            return res.status(200).json({ message: result.message, user: result.user });
        } else {
            return res.status(400).json({ message: result.message });
        }
    }
);

module.exports = router;
