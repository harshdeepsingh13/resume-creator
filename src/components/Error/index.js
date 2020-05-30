import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';

const Error = (props) => {
	const {
		message,
		styles
	} = props;
	return (
		<div
			className="error-container"
			style={
				{
					color: "red",
					...styles,
				}
			}
		>
			<span className="error">
				{
					message
				}
			</span>
		</div>
	)
};

Error.propTypes = {
	message: PropTypes.string.isRequired,
	styles: PropTypes.object
};

export default Error