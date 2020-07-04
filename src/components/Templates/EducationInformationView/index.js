import React, {useCallback} from 'react';
import './styles.scss';
import PropTypes from 'prop-types'
import {convertCamelToSpace} from "../../../services/utils";
import {MONTHS} from '../../../config/config';
import DefaultBlueEducationView from "./DefaultBlueEducationView";
import ModernRedEducationView from "./ModernRedEducationView";

const EducationInformationView = ({educations, theme}) => {

	const EducationComponent = useCallback(
		() => {
			switch (theme) {
				case "default-blue":
				case "default-gray":
					return <DefaultBlueEducationView educations={educations}/>
				case "modern-red":
					return <ModernRedEducationView educations={educations}/>
				default:
					return <></>
			}
		},
		[theme]
	)

	return (
		<td className={`educationInformationView-container ${theme}`}>
			{
				EducationComponent()
			}
			<span className="spacer large"/>
		</td>
	)
};

EducationInformationView.propTypes = {
	educations: PropTypes.array.isRequired,
	theme: PropTypes.string.isRequired
};

export default EducationInformationView
