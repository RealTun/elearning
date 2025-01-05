const bcrypt = require('bcrypt');
const { findUserByUid, isExistedUser, createUser, updateUser, updateRoleUser } = require('../models/repositories/user.repo');
const { generateToken } = require('../services/token.service');
const { getTokenTlu, getSummaryMark, getListMarkDetail, getCourseSubject } = require('./student.controller');
const { parseDate, parseTimestampToDate, formatDate } = require('../utils');

const signup = async (req, res) => {
    try {
        // Mẫu body request
        // {
        //     "username": "",
        //     "password": "",
        // }
        const { username, password } = req.body;

        // Kiểm tra dữ liệu yêu cầu
        if (!username || !password) {
            return res.status(400).json({
                message: 'Required fields: username, password, email, full_name',
            });
        }

        // kiểm tra ng dùng có tồn tại hay chưa
        const existingUser = await isExistedUser(username);
        if (existingUser) {
            return res.status(400).json({
                message: 'Username already exists',
            });
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUser(username, hashedPassword);
        return res.status(201).json({
            message: 'Create new user success',
            data: newUser,
        });
    }
    catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.message,
        });
    }
}

// login
const login = async (req, res) => {
    try {
        // Mẫu body request
        // {
        //     "username": "",
        //     "password": "",
        // }

        const { username, password } = req.body;

        const userFound = await findUserByUid(username);
        if (!userFound) {
            return res.status(400).json({
                message: "User not found",
            });
        }

        const isValid = bcrypt.compareSync(password, userFound.password);
        if (!isValid) {
            return res.status(400).json({
                message: "Password not correct",
            });
        }

        const token = await generateToken(userFound);

        return res.status(200).json({
            message: 'Get token success',
            data: 'Bearer ' + token,
        });

    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.message,
        });
    }
};

const syncDataStudent = async (req, res) => {
    try {

        // const userFound = await findUserByUid(req.user.username);

        // if(!userFound.isSynced){
        //     return res.status(400).json({
        //         message: 'This user had sync data'
        //     });
        // }

        const { username, password } = req.body;

        const tokenTlu = await getTokenTlu(username, password);
        const summaryMark = await getSummaryMark(tokenTlu);
        const listMarkDetail = await getListMarkDetail(tokenTlu);
        const courseSubject = await getCourseSubject(tokenTlu);

        const updateData = {
            "uid": summaryMark.uid,
            "email": summaryMark.email,
            "full_name": summaryMark.displayName,
            "gender": summaryMark.gender,
            "date_of_birth": summaryMark.birthDate,
            "department": summaryMark.department,
            "major": summaryMark.speciality,
            "class": summaryMark.class,
            "gpa": summaryMark.gpa4,
            "study_schedule": courseSubject,
            "list_mark": listMarkDetail
        }

        const userUpdated = await updateUser(req.user.username, updateData);

        if (!userUpdated) {
            return res.status(400).json({
                message: 'Error sync info user'
            });
        }

        return res.status(200).json({
            message: 'Sync data success',
            data: userUpdated,
        });
    }
    catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.message,
        });
    }
};

const updateRole = async (req, res) => {
    try {
        const userUpdated = await updateRoleUser(req.user.username);
        return res.status(200).json({
            message: 'Update role success',
            data: userUpdated,
        });
    }
    catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.message,
        });
    }
}

module.exports = {
    signup,
    login,
    syncDataStudent,
    updateRole
}