const express = require('express');
const asyncHandler = require('express-async-handler');

const { Cookbook } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const cookbook = require('../../db/models/cookbook');

const router = express.Router();

const validateEntry = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a title.')
        .isLength({ min: 3 })
        .withMessage('Title must be at least 3 characters'),
    handleValidationErrors
];

// C for CREATE
router.post(
    '/new',
    validateEntry,
    requireAuth,
    asyncHandler(async (req, res) => {
        const { title } = req.body;
    CookBook =CookBook.create({
            title,
            user_id: req.user.id
        });

        return res.json(cookbook);
    })
);

// R for READ
router.get(
    '/:id',
    requireAuth,
    asyncHandler(async (req, res) => {
        const cookbook = await Cookbook.findByPk(req.params.id);
        return res.json(cookbook);
    })
);

// GET all journals
router.get(
    '/',
    requireAuth,
    asyncHandler(async (req, res) => {
        const cookbook = await Cookbook.findAll({
            where: {
                user_id: req.user.id
            }
        });
        return res.json(cookbook);
    })
);

// U for UPDATE
router.put(
    '/:id',
    validateEntry,
    requireAuth,
    asyncHandler(async (req, res) => {
        const details = req.body;
        const id = req.params.id;
        delete details.id;
        await Cookbook.update(
            details,
            {
                where: { id },
                returning: true,
                plain: true
            }
        );
        const updatedCookbook = Cookbook.findByPk(id);
        return res.json(updatedCookbook);
    })
);

// D for DELETE
router.delete(
    '/:id',
    requireAuth,
    asyncHandler(async (req, res) => {
        const cookbookId = await Journal.destroy({ where: { id: req.params.id } });
        return res.json(cookbookId);
    })
);

module.exports = router;
