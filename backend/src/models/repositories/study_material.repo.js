'use strict'

const StudyMaterial = require("../study_material.model");


const findStudyMaterialsByKeyword = async (keyword) => {
    try {
        const results = await StudyMaterial.find({
            $text: { $search: keyword }
            // $and: [
            //     { title: { $regex: keyword, $options: 'i' } }, // Tìm kiếm không phân biệt hoa thường
            //     { playlist_title: { $regex: keyword, $options: 'i' } },
            // ],
        })
        .limit(100); // Giới hạn số lượng kết quả
        return results;
    } catch (error) {
        throw error;
    }
};

const getAllStudyMaterialsPaging = async (skip, limit) => {
    try {
        const results = await StudyMaterial.find()
        .sort({ createdAt: -1 }) // Sắp xếp giảm dần theo `createdAt`
        .skip(skip)
        .limit(limit)
        .exec();
        return results;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    findStudyMaterialsByKeyword,
    getAllStudyMaterialsPaging
}