import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import {MONTHS} from '../../../config/config'

const WorkExperienceInformationView = ({
	                                       workExperiences,
	                                       theme
                                       }) => {
	return (
		<td className={`workExperienceInformationView ${theme}`}>
			<span className="spacer medium"/>
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
		</td>
	)
};

WorkExperienceInformationView.propTypes = {
	workExperiences: PropTypes.array.isRequired,
	theme: PropTypes.string.isRequired
};

const WorkExperienceView = ({
	                            workExperience: {
		                            company,
		                            position,
		                            startDate,
		                            endDate,
		                            isPresent,
		                            responsibilities,
		                            location
	                            }
                            }) => {
	return (
		<tr className="workExperience-container">
			<span className="spacer small"/>
			<tr className="companyNamePositionDuration-container">
				<td className="companyNamePosition">
					{
						`${position} at ${company}`
					}
				</td>
				<td className="duration">
					{
						isPresent ?
							'Sill in development' :
							`${new Date(startDate).getDate()} ${MONTHS[new Date(startDate).getMonth()]} ${new Date(startDate).getFullYear()} - ${new Date(endDate).getDate()} ${MONTHS[new Date(endDate).getMonth()]} ${new Date(endDate).getFullYear()}`
					}
				</td>
			</tr>
			<tr className="responsibilities">
				<td colSpan={2}>
					{
						responsibilities
					}
				</td>
			</tr>
			<tr className="location">
				<td colSpan={2}>
					{
						location
					}
				</td>
			</tr>
			<span className="spacer small"/>
		</tr>
	)
};
WorkExperienceView.propTypes = {
	workExperience: PropTypes.shape({
		company: PropTypes.string,
		position: PropTypes.string,
		startDate: PropTypes.string,
		endDate: PropTypes.string,
		isPresent: PropTypes.bool,
		responsibilities: PropTypes.string,
		location: PropTypes.string
	}).isRequired
};
export default WorkExperienceInformationView