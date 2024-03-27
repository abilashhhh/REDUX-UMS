const asyncHandler = require("express-async-handler");

// MODELS
const Goal = require('../models/goalModel')
const User = require('../models/userModel')


// @desc Get goal
// @route GET /api/goal
// @access Private

const getGoal = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })
    res.status(200).json(goals)
})

// @desc Set goal
// @route POST /api/goal
// @access Private

const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error("Please add a text field")
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(goal)
})

// @desc Update goal
// @route PUT /api/goal/:id
// @access Private

const updateGoal = asyncHandler(async (req, res) => {

    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(404)
        throw new Error("Goal not found")
    }
 // ------------------- 
    // const user = await User.findById(req.user.id)

    // // check for user
    // if (!user) {
    //     res.status(401)
    //     throw new Error('User not found')
    // }

    // // make sure the logged in user matches the goal user
    // if (goal.user.toString() !== user.id) {
    //     res.status(401)
    //     throw new Error('User not authorized')
    // }

   // -------------------  

    // check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
 // -------------------

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedGoal)
})

// @desc Delete goal
// @route DELETE /api/goal/:id
// @access Private

const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findByIdAndDelete(req.params.id);
    if (!goal) {
        res.status(404);
        throw new Error("Goal not found");
    }

 // -------------------

    // const user = await User.findById(req.user.id)

    // // check for user
    // if (!user) {
    //     res.status(401)
    //     throw new Error('User not found')
    // }

    // // make sure the logged in user matches the goal user
    // if (goal.user.toString() !== user.id) {
    //     res.status(401)
    //     throw new Error('User not authorized')
    // }
    
 // -------------------
    
 
    // check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
 // -------------------

    res.status(200).json({ id: req.params.id });
});


module.exports = {
    getGoal,
    setGoal,
    updateGoal,
    deleteGoal
}