import config from "../config/config";

const avatar = {
	folder: "User%20Avatar/"
};
const {cloudinary} = config;

export const getAvatarLink = publicId =>
	`${cloudinary.defaultResponseURL}${avatar.folder}${publicId}`;
