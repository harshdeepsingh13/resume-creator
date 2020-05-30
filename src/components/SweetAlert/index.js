import React from 'react';
import PropTypes from 'prop-types';
import Swal from "sweetalert2";
import {COPYRIGHT_TEXT, SWEET_ALERT_TYPES} from "../../config/config";

const SweetAlert = (props) => {
	const {
		type,
		title,
		text,
		html,
		toast,
		onSuccess,
		onFailure,
		input,
		showCancelButton,
		inputPlaceholder,
		inputValidator
	} = props;
	Swal.fire({
		type,
		title,
		text,
		html,
		footer: COPYRIGHT_TEXT,
		toast,
		input,
		showCancelButton,
		inputPlaceholder,
		inputValidator
	})
		.then(result => {
			onSuccess(result);
		})
		.catch(err => {
			console.log('sweet alert err', err);
			onFailure();
		});
	return (
		<></>
	);
};

SweetAlert.propTypes = {
	type: PropTypes.oneOf(Object.entries(SWEET_ALERT_TYPES).map(([,value]) => value)).isRequired,
	title: PropTypes.string.isRequired,
	text: PropTypes.string,
	html: PropTypes.string,
	toast:PropTypes.bool,
	onSuccess: PropTypes.func.isRequired,
	onFailure: PropTypes.func,
	input:PropTypes.string,
	showCancelButton: PropTypes.bool,
	inputPlaceholder:PropTypes.string,
	inputValidator: PropTypes.func
};

SweetAlert.defaultProps = {
	type: undefined,
	title: "Sweet Alert",
	text: undefined,
	html: undefined,
	toast: false,
	onSuccess: () => console.log('Sweet Alert onSuccess'),
	onFailure: () => console.log('Sweet Alert onFailure'),
	showCancelButton: false
};

export default SweetAlert