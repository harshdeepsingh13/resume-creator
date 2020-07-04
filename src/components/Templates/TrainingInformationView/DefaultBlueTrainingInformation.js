import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import TrainingCertificationView from "./TrainingCertificationView";

const DefaultBlueTrainingInformation = ({trainingsCertifications}) => {
	return <>
		<table className="inner-table">
			<tr className="section-header-container">
				<h4 className="section-header">
					Trainings & Certifications
				</h4>
			</tr>
			<tr className="section">
				<span className="spacer small"/>
				{
					trainingsCertifications.map(training =>
						<TrainingCertificationView
							training={training}
						/>)
				}
			</tr>
		</table>
	</>
};

DefaultBlueTrainingInformation.propTypes = {
	trainingsCertifications: PropTypes.array.isRequired
};

export default DefaultBlueTrainingInformation
