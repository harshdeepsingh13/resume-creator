import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import {MONTHS} from "../../../config/config";

const TrainingInformationView = ({theme, trainingsCertifications}) => {
	return (
		<td className={`trainingInformationView ${theme}`}>
			<span className="spacer medium"/>
			<table className="inner-table">
				<tr className="section-header-container">
					<h4 className="section-header">
						Trainings & Certifications
					</h4>
				</tr>
				<tr className="section">
					{
						trainingsCertifications.map(training =>
							<TrainingCertificationView
								training={training}
							/>)
					}
				</tr>
			</table>
		</td>
	)
};

TrainingInformationView.propTypes = {
	theme: PropTypes.string.isRequired,
	trainingsCertifications: PropTypes.array.isRequired
};

const TrainingCertificationView = ({
	                                   training: {
		                                   name,
		                                   link,
		                                   summary,
		                                   startDate,
		                                   endDate
	                                   }
                                   }) => {
	return (
		<tr className="training-container">
			<span className="spacer small"/>
			<table className="inner-table">
				<tr className="trainingName-container">
					<td className="trainingName">{name}</td>
					<td className="duration">{new Date(startDate).getDate()} {MONTHS[new Date(startDate).getMonth()]} {new Date(startDate).getFullYear()} - {new Date(endDate).getDate()} {MONTHS[new Date(endDate).getMonth()]} {new Date(endDate).getFullYear()}</td>
				</tr>
				{
					link &&
					<tr className="certificationLink-container">
						<a href={link.trim()} className="certificationLink link">Certificate</a>
					</tr>
				}
				<tr className="summary-container">
					<td className="summary" colSpan={2}>
						{summary}
					</td>
				</tr>
			</table>
		</tr>
	)
};

TrainingCertificationView.propTypes = {
	training: PropTypes.shape({
		name: PropTypes.string,
		link: PropTypes.string,
		summary: PropTypes.string,
		startDate: PropTypes.string,
		endDate: PropTypes.string
	}).isRequired
};


export default TrainingInformationView
