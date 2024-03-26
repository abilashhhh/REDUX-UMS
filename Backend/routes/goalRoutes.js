const express = require("express");
const router = express.Router()

const { getGoal, setGoal, updateGoal, deleteGoal } = require('../controllers/goalcontroller')

// middleware functions
const { protect } = require('../middleware/authMiddleware')


// router.get('/' , protect ,getGoal)
// router.post('/' ,protect, setGoal)
// router.put('/:id' , protect,updateGoal)
// router.delete('/:id' ,protect, deleteGoal)
// OR 
router.route('/').get(protect, getGoal).post(protect, setGoal)
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal)

module.exports = router