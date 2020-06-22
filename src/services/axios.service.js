import axios from 'axios';
import {getToken} from "./cookies.service";


const axiosInstance = (token = getToken()) => {
	const ai = axios.create();
	ai.interceptors.request.use(config => {
		config.headers.authentication = token;
		return config;
	});
	return ai;
};

export const login = (email, password) =>
	axios({
		method: "POST",
		url: "/api/v1/user/login",
		data: {
			email,
			password
		}
	});

export const register = (name, email, password) =>
	axios({
		method: "POST",
		url: "/api/v1/user/register",
		data: {
			name,
			email,
			password
		}
	});

export const getBasicInformation = () =>
	axiosInstance()(
		{
			method: "GET",
			url: '/api/v1/user/basicInformation'
		}
	);

export const updateBasicInformation = basicInformation =>
	axiosInstance()(
		{
			method: "POST",
			url: '/api/v1/user/basicInformation',
			data: {
				basicInformation
			}
		}
	);

export const updateEducationInformation = educationInformation =>
	axiosInstance()(
		{
			method: "POST",
			url: '/api/v1/user/educationInformation',
			data: {
				educationInformation
			}
		}
	);

export const getEducationInformation = () =>
	axiosInstance()(
		{
			method: "GET",
			url: '/api/v1/user/educationInformation'
		}
	);

export const updateSkillInformation = (skills) =>
	axiosInstance()(
		{
			method: 'POST',
			url: '/api/v1/user/skillInformation',
			data: {
				skills
			}
		}
	);

export const getSkillInformation = () =>
	axiosInstance()(
		{
			method: "GET",
			url: "/api/v1/user/skillInformation"
		}
	);

export const updateWorkExperiences = workExperiences =>
	axiosInstance()(
		{
			method: "POST",
			url: '/api/v1/user/workExperienceInformation',
			data: {
				workExperiences
			}
		}
	);

export const getWorkExperiences = () =>
	axiosInstance()(
		{
			method: 'GET',
			url: '/api/v1/user/workExperienceInformation'
		}
	);

export const deleteWorkExperience = workExperienceId =>
	axiosInstance()(
		{
			method: 'DELETE',
			url: '/api/v1/user/workExperienceInformation',
			data: {
				workExperienceId
			}
		}
	);

export const getProjectsInformation = () =>
	axiosInstance()(
		{
			method: "GET",
			url: '/api/v1/user/projectInformation'
		}
	);

export const getTrainingsInformation = () =>
	axiosInstance()(
		{
			method: "GET",
			url: '/api/v1/user/trainingInformation'
		}
	);



export const updatedProjectInformation = projects =>
	axiosInstance()(
		{
			method: "POST",
			url: '/api/v1/user/projectInformation',
			data: {
				projects
			}
		}
	);

export const updatedTrainingInformation = trainings =>
	axiosInstance()(
		{
			method: "POST",
			url: '/api/v1/user/trainingInformation',
			data: {
				trainings
			}
		}
	);



export const deleteProject = projectId =>
	axiosInstance()(
		{
			method: 'DELETE',
			url: '/api/v1/user/projectInformation',
			data: {
				projectId
			}
		}
	);

export const deleteTraining = trainingId =>
	axiosInstance()(
		{
			method: 'DELETE',
			url: '/api/v1/user/trainingInformation',
			data: {
				trainingId
			}
		}
	);


export const deleteEducation = educationId =>
	axiosInstance()(
		{
			method: "DELETE",
			url: '/api/v1/user/educationInformation',
			data: {
				educationId
			}
		}
	);

export const getCompleteResumeInformation = () =>
	axiosInstance()(
		{
			method: 'GET',
			url: "/api/v1/user/completeInformation"
		}
	);
