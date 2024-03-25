const mongoose = require('mongoose');

const goalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: [true, 'Please add a text value']
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Goal', goalSchema);


// every goal is associated with a paricular user, so we add a ref to the User model
