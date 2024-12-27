const express = require('express');
const { searchJobs, findCompanyByName, predictCareer } = require('../controllers/job.controller');
const { login, getSummaryMark, getListMarkDetail, getCourseSubject } = require('../controllers/student.controller');
const router = express.Router();

// student
router.post('/login', login);
router.get('/student/getSummaryMark', getSummaryMark);
router.get('/student/getDetailsMark', getListMarkDetail);
router.get('/student/getCourseSubject', getCourseSubject);

// jobs
router.post('/jobs/search', searchJobs);
router.post('/company/search', findCompanyByName);

// predict
router.post('/predict/career', predictCareer);

module.exports = router;