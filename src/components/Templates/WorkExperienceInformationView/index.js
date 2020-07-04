import React, {useCallback} from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import {MONTHS} from '../../../config/config'
import WorkExperienceView from "./WorkExperienceView";
import DefaultBlueWorkExperience from "./DefaultBlueWorkExperience";
import ModernRedWorkExperience from "./ModernRedWorkExperience";

const WorkExperienceInformationView = ({
	                                       workExperiences,
	                                       theme
                                       }) => {

	const WorkExperienceComponent = useCallback(
		() => {
			switch(theme){
				case "default-blue":
				case "default-gray":
					return <DefaultBlueWorkExperience workExperiences={workExperiences}/>
				case "modern-red":
					return <ModernRedWorkExperience workExperiences={workExperiences}/>
				default:
					return <></>
			}
		},
		[theme]
	)

	return (
		<td className={`workExperienceInformationView ${theme}`}>
			{WorkExperienceComponent()}
		</td>
	)
};

WorkExperienceInformationView.propTypes = {
	workExperiences: PropTypes.array.isRequired,
	theme: PropTypes.string.isRequired
};

export default WorkExperienceInformationView
