const router = require('express').Router();
const { protect, onlyRole } = require('../middleware/auth');
const { createRecord, getRecords, updateRecord, deleteRecord } = require('../controller/userController');

router.use(protect, onlyRole('user'));      

router.post('/records', createRecord);
router.get('/records', getRecords);
router.put('/records/:id', updateRecord);
router.delete('/records/:id', deleteRecord);

module.exports = router;