const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    course_title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: false,
        trim: true,
    },
    playlists: [
        {
            type: String, // `playlist_title` từ StudyMaterial
            required: true,
        },
    ],
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Người dùng đã đăng ký khoá học
        },
    ],
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;