const mongoose = require('mongoose');

const studyMaterialSchema = new mongoose.Schema({
    playlist_title: {
        type: String,
        required: true,
    },
    list_video: [
        {
            title: {
                type: String,
                required: true,
                trim: true,
            },
            type: {
                type: String,
                enum: ['pdf', 'video', 'link'],
                required: true,
                default: 'video'
            },
            url: {
                type: String,
                required: true,
            },
            embed_code: {
                type: String,
                required: true,
            },
        }
    ],
    created_at: {
        type: Date,
        default: Date.now,
    },
});

// studyMaterialSchema.index({ title: 'text', playlist_title: 'text' });
studyMaterialSchema.index({ playlist_title: 1 });

const StudyMaterial = mongoose.model('StudyMaterial', studyMaterialSchema);
module.exports = StudyMaterial;
