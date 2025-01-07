const express = require('express');
const { searchJobs, findCompanyByName, predictCareer } = require('../controllers/job.controller');
const { chatCompletion, suggest } = require('../controllers/openai.controller');
const { findStudyMaterials, getAllStudyMaterials, importDataFromCSV, getStudyMaterialsbyId } = require('../controllers/study_material.controller');
const { signup, login, syncDataStudent, updateRole, getCurrentUser } = require('../controllers/user.controller');
const { authenticateToken, checkRole } = require('../middleware/auth.middleware');
const router = express.Router();

// auth
router.post('/signup', signup);
router.post('/login', login);

// middleware auth
router.use(authenticateToken);

//user
router.get('/user', getCurrentUser);

// student
router.post('/student/syncData', syncDataStudent);
router.post('/student/role', updateRole);

// jobs
router.post('/jobs/search', searchJobs);
router.post('/company/search', findCompanyByName);

// predict
router.post('/predict/career', predictCareer);

// study material
// router.post('/studyMaterial', importDataFromCSV);
router.post('/studyMaterials/search', findStudyMaterials);
router.get('/studyMaterials', getAllStudyMaterials);
router.get('/studyMaterials/:id', getStudyMaterialsbyId);

// middleware role
router.use(checkRole('paid_user'));
// openai
router.post('/openai/chat', chatCompletion);
router.post('/openai/suggest', suggest);


module.exports = router;