import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types'
import {convertCamelToSpace} from "../../../services/utils";

const EducationInformationView = ({educations, theme}) => {
	return (
		<tr className={`educationInformationView-container ${theme}`}>
			<tr className="section-header-container">
				<h4 className="section-header">
					Education
				</h4>
			</tr>
			<tr className="section">
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
										`${new Date(education.startDate).toLocaleDateString().slice(3)} - ${new Date(education.endDate).toLocaleDateString().slice(3)}`
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
		</tr>
	)
};

EducationInformationView.propTypes = {
	educations: PropTypes.array.isRequired,
	theme: PropTypes.string.isRequired
};

export default EducationInformationView