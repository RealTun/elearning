const scheduleSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course', // Khoá học liên quan
        required: true,
    },
    day: {
        type: Date, // Ngày học
        required: true,
    },
    study_materials: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'StudyMaterial',
        },
    ],
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});

const Schedule = mongoose.model('Schedule', scheduleSchema);
module.exports = Schedule;