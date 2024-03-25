const asyncHandler = require("express-async-handler");

// @desc Get goal
// @route GET /api/goal
// @access Private

const getGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        // res.status(400).json({message :'Please add a text field'})
        res.status(400)
        throw new Error('Please add a text field')
    }
    res.status(200).json({ message: 'Get goal' })
})

// @desc Set goal
// @route POST /api/goal
// @access Private

const setGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Set goal' })
})

// @desc Update goal
// @route PUT /api/goal/:id
// @access Private

const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update goal ${req.params.id}` })
})

// @desc Delete goal
// @route DELETE /api/goal/:id
// @access Private

const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete goal ${req.params.id}` })
})

module.exports = {
    getGoal,
    setGoal,
    updateGoal,
    deleteGoal
}