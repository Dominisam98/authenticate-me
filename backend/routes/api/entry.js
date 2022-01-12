const express = require('express');
const asyncHandler = require('express-async-handler');

const { Entry } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

const validateEntry = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a title.')
        .isLength({ min: 2 })
        .withMessage('Title must be at least 2 characters'),
    handleValidationErrors
];

// C for CREATE
router.post(
    '/new',
    validateEntry,
    requireAuth,
    asyncHandler(async (req, res) => {
        const { title, body, cookbook_id } = req.body;
        const entry = await Entry.create({
            title,
            body: body || '',
            cookbook_id,
            user_id: req.user.id
        });

        return res.json(entry);
    })
);

// R for READ
router.get(
    '/:id(\\d+)',
    requireAuth,
    asyncHandler(async (req, res) => {
        const entry = await Entry.findByPk(req.params.id);
        return res.json(entry);
    })
);

// GET all entries
router.get(
    '/',
    requireAuth,
    asyncHandler(async (_req, res) => {
        const entries = await Entry.findAll();
        return res.json(entries);
    })
)

// U for UPDATE
router.put(
    '/:id',
    validateEntry,
    requireAuth,
    asyncHandler(async (req, res) => {
        const details = req.body;
        const id = req.params.id;
        delete details.id;
        await Entry.update(
            details,
            {
                where: { id },
                returning: true,
                plain: true
            }
        );
        const updatedEntry = Entry.findByPk(id);
        return res.json(updatedEntry);
    })
)

// D for DELETE
router.delete(
    '/:id',
    requireAuth,
    asyncHandler(async (req, res) => {
        const entryId = await Entry.destroy({ where: { id: req.params.id } });
        return res.json(entryId);
    })
);

module.exports = router;
