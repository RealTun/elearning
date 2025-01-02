const express = require('express');
const { searchJobs, findCompanyByName, predictCareer } = require('../controllers/job.controller');
const { chatCompletion } = require('../controllers/openai.controller');
const { findStudyMaterials, getAllStudyMaterials } = require('../controllers/study_material.controller');
const { signup, login, syncDataStudent } = require('../controllers/user.controller');
const { authenticateToken } = require('../middleware/auth.middleware');
const router = express.Router();

// auth
router.post('/signup', signup);
router.post('/login', login);

// middleware auth
router.use(authenticateToken);

// student
router.post('/student/syncData', syncDataStudent);

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