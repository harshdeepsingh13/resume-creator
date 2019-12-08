const express = require('express');

const {
	loginController,
	registerController,
	getBasicInformationController,
	updateBasicInformationController,
	updateEducationInformationController,
	getEducationInformationController,
	updateSkillInformationController,
	getSkillInformationController,
	updateWorkExperiencesController,
	getWorkExperiencesController,
	getProjectInformationController,
	updatedProjectInformationController,
	deleteProjectInformationController,
	deleteWorkExperienceController,
	deleteEducationInformationController
} = require('./user.controller');
const authenticationMiddleware = require('../../../middlewares/authenticationMiddleware');

const app = express.Router();

app.post('/login', loginController);

app.post('/register', registerController);

app.get('/basicInformation', authenticationMiddleware, getBasicInformationController);

app.post('/basicInformation', authenticationMiddleware, updateBasicInformationController);

app.get('/educationInformation', authenticationMiddleware, getEducationInformationController);

app.post('/educationInformation', authenticationMiddleware, updateEducationInformationController);

app.delete ('/educationInformation', authenticationMiddleware, deleteEducationInformationController);

app.get('/skillInformation', authenticationMiddleware, getSkillInformationController);

app.post('/skillInformation', authenticationMiddleware, updateSkillInformationController);

app.get('/workExperienceInformation', authenticationMiddleware, getWorkExperiencesController);

app.post('/workExperienceInformation', authenticationMiddleware, updateWorkExperiencesController);

app.delete('/workExperienceInformation', authenticationMiddleware, deleteWorkExperienceController);

app.get('/projectInformation', authenticationMiddleware, getProjectInformationController);

app.post('/projectInformation', authenticationMiddleware, updatedProjectInformationController);

app.delete('/projectInformation', authenticationMiddleware, deleteProjectInformationController);

module.exports = app;