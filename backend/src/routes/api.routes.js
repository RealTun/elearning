const express = require('express');
const { searchJobs, findCompanyByName, predictCareer } = require('../controllers/job.controller');
const { login, getSummaryMark, getListMarkDetail, getCourseSubject } = require('../controllers/student.controller');
const { chatCompletion } = require('../controllers/openai.controller');
const { importDataFromCSV, findStudyMaterials, getAllStudyMaterials } = require('../controllers/study_material.controller');
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

// openai
router.post('/openai/chat', chatCompletion);


// study material
// router.post('/studyMaterial', importDataFromCSV);
router.post('/studyMaterials/search', findStudyMaterials);
router.get('/studyMaterials', getAllStudyMaterials);

module.exports = router;