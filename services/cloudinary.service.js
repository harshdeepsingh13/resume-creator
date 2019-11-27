const {cloudinary} = require('../config/config')
const avatar = {
	folder: "User%20Avatar/"
};

exports.getAvatarLink = publicId =>
	`${cloudinary.defaultResponseURL}${avatar.folder}${publicId}`;