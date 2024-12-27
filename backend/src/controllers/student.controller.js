const axios = require('axios');

const baseUrl = 'https://sinhvien1.tlu.edu.vn';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

// login
const login = async (req, res, next) => {
    try {
        const apiUrl = `${baseUrl}/education/oauth/token`;

        // Mẫu body request
        // {
        //     "client_id": "education_client",
        //     "grant_type": "password",
        //     "username": "",
        //     "password": "",
        //     "client_secret": "password"
        // }

        // Dữ liệu gửi đi từ body của client
        const requestData = req.body;

        // Gửi yêu cầu POST đến API
        const response = await axios.post(apiUrl, requestData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Trả kết quả từ API cho client
        res.status(200).json({
            message: 'Get token success',
            token: `Bearer ${response.data['access_token']}`,
            // data: response.data
        });
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.message,
        });
    }
};

const getListMarkDetail = async (req, res, next) => {
    try {
        const apiUrl = `${baseUrl}/education/api/studentsubjectmark/getListMarkDetailStudent`;     

        const token = req.headers.authorization;

        if (!token) {
            return res.status(400).json({
                message: 'Authorization token is required',
            });
        }

        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': token
            },
        });

        const result = response.data.map(item => {
            return {
                subjectName: item['subject']['subjectName'],
                mark: item['mark'],
                mark4: item['mark4'],
                charmark: item['charMark']
            };
        });

        res.status(200).json({
            message: 'Get list mark success',
            data: result
        });
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.message
        });
    }
};

const getSummaryMark = async (req, res, next) => {
    try {
        const apiUrl = `${baseUrl}/education/api/studentsummarymark/getbystudent`;

        const token = req.headers.authorization;

        if (!token) {
            return res.status(400).json({
                message: 'Authorization token is required',
            });
        }

        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': token
            },
        });

        const data = response.data;
        const result = {
            "uid": data['student']['studentCode'],
            "displayName": data['student']['displayName'],
            "username": data['student']['username'],
            "email": data['student']['user']['email'],
            "birthPlace": data['student']['birthPlace'],
            "birthDate": data['student']['birthDateString'],
            "gender": data['student']['gender'],
            "phoneNumber": data['student']['phoneNumber'],
            "idNumber": data['student']['idNumber'],
            "class": data['student']['enrollmentClass']['className'],
            "speciality": data['student']['enrollmentClass']['speciality']['name'],
            "department": data['student']['enrollmentClass']['department']['name'],
            "courseyear": data['student']['enrollmentClass']['courseyear']['name'],
            "gpa4": data['mark4'],
            "gpa10": data['mark']
        };

        res.status(200).json({
            message: 'Get student info success',
            data: result
        });
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.message
        });
    }
};

const getCourseSubject = async (req, res, next) => {
    try {
        const apiUrl = `${baseUrl}/education/api/StudentCourseSubject/studentLoginUser/11`;

        const token = req.headers.authorization;

        if (!token) {
            return res.status(400).json({
                message: 'Authorization token is required',
            });
        }

        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': token
            },
        });

        const data = response.data;
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'Asia/Ho_Chi_Minh' };
        const result = data.map(item => {
            const startDate = new Date(item['courseSubject']['semesterSubject']['semester']['startDate']);
            const endDate = new Date(item['courseSubject']['semesterSubject']['semester']['endDate']);
            return {
                subjectName: item['subjectName'],
                subjectCode: item['subjectCode'],
                numberOfCredit: item['numberOfCredit'],
                start: item['courseSubject']['timetables'][0]['startHour']['start'],
                startString: item['courseSubject']['timetables'][0]['startHour']['startString'],
                end: item['courseSubject']['timetables'][0]['endHour']['end'],
                endString: item['courseSubject']['timetables'][0]['endHour']['endString'],
                // startDate: item['courseSubject']['semesterSubject']['semester']['startDate'],
                // endDate: item['courseSubject']['semesterSubject']['semester']['endDate']
                startDate: new Intl.DateTimeFormat('vi-VN', options).format(startDate),
                endDate: new Intl.DateTimeFormat('vi-VN', options).format(endDate)
            };
        });

        res.status(200).json({
            message: 'Get info course subjects success',
            data: result
        });
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.message
        });
    }
};

module.exports = {
    login,
    getListMarkDetail,
    getSummaryMark,
    getCourseSubject
};