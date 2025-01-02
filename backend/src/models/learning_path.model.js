const mongoose = require('mongoose');

const learningPathSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    content: {
        type: Object,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const LearningPath = mongoose.model('LearningPath', learningPathSchema);
module.exports = LearningPath;
