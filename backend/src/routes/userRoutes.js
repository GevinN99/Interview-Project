const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/profile', auth.authenticate, userController.viewProfile);
router.put('/profile', auth.authenticate, userController.updateProfile);
router.delete('/account', auth.authenticate, userController.deleteAccount);
router.delete('/:id', auth.authenticate, userController.deleteUserById);
router.get('/users', auth.authenticate, userController.getAllUsers);

module.exports = router;