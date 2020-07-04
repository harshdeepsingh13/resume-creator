import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import TrainingCertificationView from "./TrainingCertificationView";

const ModernRedTrainingInformation = ({trainingsCertifications}) => {
	return <>
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
	</>
};

ModernRedTrainingInformation.propTypes = {
	trainingsCertifications: PropTypes.array.isRequired
};

export default ModernRedTrainingInformation
