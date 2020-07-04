import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import WorkExperienceView from "./WorkExperienceView";

const ModernRedWorkExperience = ({workExperiences}) => {
	return <>
		<table className="inner-table">
			<tr className="section-header-container">
				<h4 className="section-header">
					Work Experiences
				</h4>
			</tr>
			<tr className="section">
				{
					workExperiences.map(workExperience =>
						<WorkExperienceView
							workExperience={workExperience}
						/>)
				}
			</tr>
		</table>
	</>
};

ModernRedWorkExperience.propTypes = {
	workExperiences: PropTypes.array.isRequired
};

export default ModernRedWorkExperience
