import {MONTHS} from "../../../config/config";
import PropTypes from "prop-types";
import React from "react";

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
			<table className="inner-table">
				<tr className="companyNamePositionDuration-container">
					<td className="companyNamePosition">
						{
							`${position} at ${company}`
						}
					</td>
					<td className="duration">
						{
							isPresent ?
								'Sill working' :
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
			</table>
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

export default WorkExperienceView;
