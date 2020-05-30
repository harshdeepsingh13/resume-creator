import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types'
import {convertCamelToSpace} from "../../../services/utils";
import {MONTHS} from '../../../config/config';

const EducationInformationView = ({educations, theme}) => {
	return (
		<td className={`educationInformationView-container ${theme}`}>
			<span className="spacer medium"/>
			<tr className="section-header-container">
				<h4 className="section-header">
					Education
				</h4>
			</tr>
			<tr className="section">
				<span className="spacer small"/>
				{
					educations.map(education => (
						<tr className="education-container">
							<tr className="type">
								{
									convertCamelToSpace(education.type)
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
										`${new Date(education.startDate).getDate()} ${MONTHS[new Date(education.startDate).getMonth()]} ${new Date(education.startDate).getFullYear()} - ${
											education.isPresent ?
												'Present' :
												`${new Date(education.endDate).getDate()} ${MONTHS[new Date(education.endDate).getMonth()]} ${new Date(education.endDate).getFullYear()}`}`
									}
								</td>
								<td className="score">
									{`${education.score} ${education.isPercentage ? '%' : '/ 10 CGPA'}`}
								</td>
							</tr>
							{
								education.course &&
								<tr className="course-container">
									<tr className="course-header">
										Course
									</tr>
									<tr className="course">
										<ul>
											<li>{education.course}</li>
										</ul>
									</tr>
								</tr>
							}
						</tr>
					))
				}
			</tr>
			<span className="spacer large"/>
		</td>
	)
};

EducationInformationView.propTypes = {
	educations: PropTypes.array.isRequired,
	theme: PropTypes.string.isRequired
};

export default EducationInformationView