const express = require('express');

const {loginController, registerController, getBasicInformationController, updateBasicInformationController, updateEducationInformationController} = require('./user.controller');
const authenticationMiddleware = require('../../../middlewares/authenticationMiddleware');

const app = express.Router();

app.post('/login', loginController);

app.post('/register', registerController);

app.get('/basicInformation', authenticationMiddleware, getBasicInformationController);

app.post('/basicInformation', authenticationMiddleware, updateBasicInformationController);

app.post('/educationInformation', authenticationMiddleware, updateEducationInformationController);

module.exports = app;