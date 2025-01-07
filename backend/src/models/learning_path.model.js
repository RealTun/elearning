const mongoose = require('mongoose');

const userLearningPathSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, // Liên kết tới người dùng
        ref: 'User',
        required: true,
    },
    video_id: {
        type: mongoose.Schema.Types.ObjectId, // Liên kết tới video
        ref: 'StudyMaterial',
        required: true,
    },
    is_watched: {
        type: Boolean, // Trạng thái đã xem hay chưa
        default: false,
    },
    is_completed: {
        type: Boolean, // Trạng thái hoàn thành
        default: false,
    },
    watched_at: {
        type: Date, // Ngày xem video
    },
    completed_at: {
        type: Date, // Ngày hoàn thành video
    },
    progress: {
        type: Number, // Tiến trình xem video (phần trăm)
        default: 0,
        min: 0,
        max: 100,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const UserLearningPath = mongoose.model('UserLearningPath', userLearningPathSchema);
module.exports = UserLearningPath;