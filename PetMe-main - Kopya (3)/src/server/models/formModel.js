const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    eventName: {
        type: String,
        required: true
    }
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
