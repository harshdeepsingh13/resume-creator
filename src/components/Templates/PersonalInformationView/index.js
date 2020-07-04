import React, {useCallback} from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import {MONTHS} from '../../../config/config';
import DefaultBluePersonalInformation from "./DefaultBluePersonalInformation";
import ModernRedPersonalInformation from "./ModernRedPersonalInformation";

const PersonalInformationView = ({
	                                 information,
	                                 theme
                                 }) => {

	const PersonalInformationComponent = useCallback(
		() => {
			switch (theme) {
				case "default-blue":
				case "default-gray":
					return <DefaultBluePersonalInformation information={information}/>
				case "modern-red":
					return <ModernRedPersonalInformation information={information}/>
			}
		},
		[theme]
	)

	return (
		<td className={`personalInformationView-container ${theme}`}>
			{PersonalInformationComponent()}
		</td>
	)

};

PersonalInformationView.propTypes = {
	information: PropTypes.shape({
		contactNumber: PropTypes.number,
		website: PropTypes.string,
		socialMediaLinks: PropTypes.object,
		currentLocation: PropTypes.shape({
			city: PropTypes.string,
			country: PropTypes.string
		}),
		dob: PropTypes.string
	}).isRequired,
	theme: PropTypes.string.isRequired
};

export default PersonalInformationView
