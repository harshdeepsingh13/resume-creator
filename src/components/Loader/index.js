import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from '@fortawesome/fontawesome-svg-core';
import {faCircleNotch} from "@fortawesome/free-solid-svg-icons";
import {STYLE_CONSTANTS} from '../../config/config'

library.add(faCircleNotch);

const Loader = (props) => {
	const {
		size,
		styles,
		containerStyles
	} = props;
	return (
		<div
			className="loader-container"
			style={
				{
					...containerStyles
				}
			}
		>
			<FontAwesomeIcon
				icon={"circle-notch"}
				spin
				size={size}
				color={STYLE_CONSTANTS.PRIMARY_COLORS.PRIMARY_REDDISH}
				style={styles}
			/>
		</div>
	)
};

Loader.propTypes = {
	size: PropTypes.string,
	styles: PropTypes.object,
	containerStyles: PropTypes.object
};
Loader.defaultProps = {
	size: "lg",
	styles: {},
	containerStyles: {}
}

export default Loader