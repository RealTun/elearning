const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');
const StudyMaterial = require('../models/study_material.model');
const { findStudyMaterialsByKeyword, getAllStudyMaterialsPaging } = require('../models/repositories/study_material.repo');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

const fieldMapping = {
    "title": "title",
    "url": "url",
    "playlist_title": "playlist_title",
    "embed_code": "embed_code"
};

const importDataFromCSV = async (req, res, next) => {
    try {
        const results = [];
        const filePath = path.resolve(__dirname, '../dbs/youtube_data.csv');
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (row) => {
                const data = {
                    'title': row['title'],
                    'url': row['url'],
                    'playlist_title': row['playlist_title'],
                    'embed_code': row['embed_code'],
                };
                results.push(data);
            })
            .on('end', async () => {
                console.log('CSV file successfully processed');
                // Thêm dữ liệu vào MongoDB
                try {
                    await StudyMaterial.insertMany(results);
                    res.status(201).json({
                        message: 'Insert data success',
                        data: []
                    });
                } catch (err) {
                    res.status(400).json({
                        message: err.message
                    });
                }
            });
    } catch (err) {
        res.status(err.response?.status || 500).json({
            message: err.message
        });
    }
};

const findStudyMaterials = async (req, res, next) => {
    // example body 
    // {
    //     "keyword": ""
    // }
    const keyword = req.body.keyword;

    if (keyword === '') {
        return res.status(400).json({
            message: 'Keyword cannot be blank',
        });
    }

    try {
        const results = await findStudyMaterialsByKeyword(keyword);
        res.status(200).json({
            message: 'Search successful',
            data: results,
        });
    } catch (error) {
        res.status(500).json({
            // message: 'Error searching records',
            error: error.message,
        });
    }
};

const getAllStudyMaterials = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const results = await getAllStudyMaterialsPaging(skip, limit);
        res.status(200).json({
            message: 'Get study materials successful',
            data: results,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

module.exports = {
    importDataFromCSV,
    findStudyMaterials,
    getAllStudyMaterials
};