import React from 'react';
import PropTypes from 'prop-types';
import SweetAlert from "../SweetAlert";
import {SWEET_ALERT_TYPES} from "../../config/config";

const SuccessAlert = (props) => {
	const {
		title,
		description,
		descriptionHtml,
		onSuccess,
		onFailure
	} = props;
	return (
		<SweetAlert
			type={SWEET_ALERT_TYPES.SUCCESS}
			title={title}
			text={description}
			html={descriptionHtml}
			onSuccess={onSuccess}
			onFailure={onFailure}
		/>
	)
};

SuccessAlert.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	descriptionHtml: PropTypes.string,
	onSuccess: PropTypes.func.isRequired,
	onFailure: PropTypes.func
};
SuccessAlert.defaultProps = {
	title: "Success",
	description: undefined,
	descriptionHtml: undefined,
	onSuccess: () => console.log('Success Alert onSuccess'),
	onFailure: () => console.log('Success Alert onFailure')
};

export default SuccessAlert