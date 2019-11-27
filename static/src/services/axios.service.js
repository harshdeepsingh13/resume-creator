import axios from 'axios';
import {getToken} from "./localStorage.service";


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
	)