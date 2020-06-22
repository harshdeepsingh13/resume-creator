import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types'
import {convertCamelToSpace} from "../../../services/utils";
import {MONTHS} from '../../../config/config';

const EducationInformationView = ({educations, theme}) => {
	return (
		<td className={`educationInformationView-container ${theme}`}>
			<span className="spacer medium"/>
			<table className="inner-table">
				<tr className="section-header-container">
					<h4 className="section-header">
						Education
					</h4>
				</tr>
				<tr className="section">
					<span className="spacer small"/>
					{
						educations.map(education => (
							<table className="inner-table">
								<td className="education-container">
									<table className="inner-table">
										<tr className="type">
											{
												convertCamelToSpace(education.type)
											}
											{
												education.course &&
												<>
													{" "}
													-
													{" "}
													<span className="course-container">
													<span className="course">
														{education.course}
													</span>
												</span>
												</>

											}
										</tr>
										<tr className="instituteNameUniversityBoard">
											{
												`${education.instituteName} (${education.university})`
											}
										</tr>
										<tr className="durationScore-container">
											<td className="duration">
												{
													`${MONTHS[new Date(education.startDate).getMonth()]} ${new Date(education.startDate).getFullYear()} - ${
														education.isPresent ?
															'Present' :
															`${MONTHS[new Date(education.endDate).getMonth()]} ${new Date(education.endDate).getFullYear()}`}`
												}
											</td>
											{
												education.score &&
												<td className="score">
													{`${education.score} ${education.isPercentage ? '%' : '/ 10 CGPA'}`}
												</td>
											}
										</tr>
									</table>
								</td>
							</table>
						))
					}
				</tr>
			</table>
			<span className="spacer large"/>
		</td>
	)
};

EducationInformationView.propTypes = {
	educations: PropTypes.array.isRequired,
	theme: PropTypes.string.isRequired
};

export default EducationInformationView
