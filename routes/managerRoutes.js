const router = require('express').Router();
const { protect, onlyRole } = require('../middleware/auth');
const { createUser, getUsers, updateUser, deleteUser, getStock } = require('../controller/managerController');

router.use(protect, onlyRole('manager'));   

router.post('/users', createUser);
router.get('/users', getUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.get('/stock', getStock);

module.exports = router;