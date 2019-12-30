import {CLOUDINARY, ERROR_MESSAGES} from "../config/config";

export const getQueryObject = (query) => {
	const queryObject = {};
	if (query.length !== 0) {
		const queryString = query.split('?')[1];
		const queryParts = queryString.split('&');
		for (let i = 0; i < queryParts.length; i++) {
			const [key, value] = queryParts[i].split('=');
			queryObject[key] = value;
		}
	}
	return queryObject;
};

export const checkWebsiteLink = websiteLink =>
	websiteLink.match(/^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+(-?[a-zA-Z0-9])*\.)+[\w]{2,}(\/\S*)?$/) ?
		[false, ''] :
		[true, ERROR_MESSAGES.WEBSITE_NOT_VALID];

export const getCloudinaryImageLink = (uploadId) => {
	return `${CLOUDINARY.RES_LINK.USER_AVATAR}${uploadId}`
};

export const convertCamelToSpace = camel => camel.replace(/([A-Z])/g, " $1").toLowerCase();