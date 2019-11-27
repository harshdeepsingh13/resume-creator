import {LOCAL_STORAGE_KEY} from '../config/config.js'

export const getToken = () => {
	const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
	return (data && data.token) ? data.token : undefined;
};

export const getItem = () =>
	JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

export const setItem = data =>
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));

export const removeItem = () =>
	localStorage.removeItem(LOCAL_STORAGE_KEY);