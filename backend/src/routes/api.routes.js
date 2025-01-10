const express = require('express');
const { searchJobs, findCompanyByName, predictCareer } = require('../controllers/job.controller');
const { suggest, chatWithAI, getChatHistory, clearChatHistory } = require('../controllers/openai.controller');
const { findStudyMaterials, getAllStudyMaterials, importDataFromCSV, getStudyMaterialsbyId } = require('../controllers/study_material.controller');
const { signup, login, syncDataStudent, updateRole, getCurrentUser, changePassword, checkMembershipStatus } = require('../controllers/user.controller');
const { authenticateToken, checkRole } = require('../middleware/auth.middleware');
const { getDocumentbyId } = require('../controllers/document.controller');
const { getInvoicesByUserIdAPI, createInvoiceAPI, updateInvoiceStatusAPI, deleteInvoiceAPI } = require('../controllers/invoice.controller');
const { addWatchHistory, isDocumentWatched, getUserCourseProgress } = require('../controllers/watchHistory.controller');
const router = express.Router();

// auth
router.post('/signup', signup);
router.post('/login', login);

// webhook payos
router.post('/payment/payos', updateInvoiceStatusAPI);

// middleware auth
router.use(authenticateToken);

//user
router.get('/user', getCurrentUser);
router.patch('/user/role', updateRole);
router.patch('/user/changePassword', changePassword);
router.post('/user/checkMembershipStatus', checkMembershipStatus);
router.post('/user/getUserCourseProgress', getUserCourseProgress);

// student
router.post('/student/syncData', syncDataStudent);

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

// document
router.get('/documents/:id', getDocumentbyId);
router.post('/documents', addWatchHistory);
router.post('/documents/:id', isDocumentWatched);

// invoice
router.post('/invoice', createInvoiceAPI);
// router.get('/invoice/:id', getInvoicesByUserIdAPI);
// router.patch('/invoice', updateInvoiceStatusAPI);
// router.delete('/invoice/:id', deleteInvoiceAPI);

// middleware role
// router.use(checkRole('paid_user'));

// openai
router.post('/openai/suggest', suggest);
router.post('/openai/chat', chatWithAI);
router.get('/openai/chat/history', getChatHistory);
router.delete('/openai/chat', clearChatHistory);

module.exports = router;