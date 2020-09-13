module.exports = {
	STYLE_CONSTANTS: {
		BASIC_COLORS: {
			LIGHT_BLUE_GREY: "#d7f3f3",
			GREYISH_BROWN: "#424242",
			SALMON: "#ff6d6d",
			DUSK: "#4a5977",
			BLUEY_GREY: "#99a1b2",
			GREYISH_BROWN_TWO: "#414141",
			BLACK: "#000000"
		},
		PRIMARY_COLORS: {
			PRIMARY_TEAL_BRIGHTEST: "#17c0c3",
			PRIMARY_TEAL_MEDIUM: "#45ceca",
			PRIMARY_TEAL_GREYED_OUT: "#d7f3f3",
			PRIMARY_REDDISH: "#fc5a5c",
			PRIMARY_YELLOWISH: "#FFC60B",
			PRIMARY_YELLOWISH_DARK: "#d7a80b",
			PRIMARY_ORANGE: "#F15A22"
		},
		BACKGROUND_AND_BORDERS: {
			GREY_DARK: "#dbdbdb",
			GREY_MEDIUM: "#ebebeb",
			GREY_LIGHT: "#f3f3f3"
		},
		TEXT: {
			GREY_DARK: "#565555",
			GREY_MEDIUM: "#6c6e6e",
			GREY_LIGHT: "#999999"
		},
		BORDER_RADIUS: '3px',
		BLACK_COLOR: '#8d8d8d',
		TEMPLATE_CONSTANTS: {
			SOLID_BLUE_TEMPLATE: {
				PRIMARY: '#509edc',
				PRIMARY_DARK: '#425a70'
			},
			DEFAULT_BLUE_TEMPLATE: {
				PRIMARY: '#0a96c3',
				PRIMARY_DARK: '#425a70'
			},
			DEFAULT_GRAY_TEMPLATE: {
				PRIMARY: "#34495e",
				PRIMARY_DARK: "#2c3e50"
			},
			MODERN_RED_TEMPLATE: {
				PRIMARY: "#ff6b6b",
				PRIMARY_DARK: "#ee5253"
			}
		}
	},
	EMAIL_REGEX: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	PASSWORD_REGEX: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
	ERROR_MESSAGES: {
		REQUIRED_FIELD_EMPTY: 'required field',
		EMAIL_NOT_FORMATTED: 'enter proper email id',
		VERIFY_PASSWORD: 'passwords entered do not match',
		SHORT_PASSWORD: 'Password should be atleast 8 characters long, should be alpha-numeric and should have atleast one special character',
		WEBSITE_NOT_VALID: 'website is not valid',
		CONTACT_NUMBER_NOT_VALID: 'Contact number entered is not valid',
		NUMBER_OUT_OF_RANGE: 'the number entered is out of given range'
	},
	LOCAL_STORAGE_KEY: 'user',
	STATUS: {
		DEFAULT: "DEFAULT",
		STARTED: "STARTED",
		SUCCESS: "SUCCESS",
		FAILURE: "FAILURE"
	},
	SWEET_ALERT_TYPES: {
		SUCCESS: "success",
		ERROR: "error",
		WARNING: "warning",
		INFO: "info",
		QUESTION: "question"
	},
	COPYRIGHT_TEXT: "&copy; Copyright 2019",
	MONTHS: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	CLOUDINARY: {
		RES_LINK: {
			USER_AVATAR: 'https://res.cloudinary.com/harshdeep-singh/image/upload/v1569133686/resumeCreator/User%20Avatar/'
		}
	},
	ICONS_PNG: {
		AT_ICON: "assets/icons/at-solid.svg",
		CALENDAR_ICON: "assets/icons/calendar-alt-solid.svg",
		FACEBOOK_ICON: "assets/icons/facebook-square-brands.svg",
		GITHUB_ICON: "assets/icons/github-brands.svg",
		WEBSITE_ICON: "assets/icons/globe-solid.svg",
		INSTAGRAM_ICON: "assets/icons/instagram-brands.svg",
		LINKEDIN_ICON: "assets/icons/linkedin-brands.svg",
		LOCATION_ICON: "assets/icons/map-marker-alt-solid.svg",
		CONTACT_ICON: "assets/icons/phone-alt-solid.svg"
	}
};
