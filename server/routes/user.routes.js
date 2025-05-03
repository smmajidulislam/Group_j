const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth.middleware');
const {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    toggleUserSuspension
} = require('../controllers/user.controller');

// All routes are protected
router.get('/', protect, admin, getUsers);
router.get('/:id', protect, getUserById);
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, deleteUser);
router.put('/:id/suspend', protect, admin, toggleUserSuspension);

module.exports = router;
