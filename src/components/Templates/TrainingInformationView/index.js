import React, {useCallback} from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import {MONTHS} from "../../../config/config";
import TrainingCertificationView from "./TrainingCertificationView";
import DefaultBlueTrainingInformation from "./DefaultBlueTrainingInformation";
import ModernRedTrainingInformation from "./ModernRedTrainingInformation";

const TrainingInformationView = ({theme, trainingsCertifications}) => {

	const TrainingComponent = useCallback(
		() => {
			switch (theme) {
				case "default-blue":
				case "default-gray":
					return <DefaultBlueTrainingInformation trainingsCertifications={trainingsCertifications}/>
				case "modern-red":
					return <ModernRedTrainingInformation trainingsCertifications={trainingsCertifications}/>
				default:
					return <></>
			}
		},
		[theme]
	)

	return (
		<td className={`trainingInformationView ${theme}`}>
			{
				TrainingComponent()
			}
		</td>
	)
};

TrainingInformationView.propTypes = {
	theme: PropTypes.string.isRequired,
	trainingsCertifications: PropTypes.array.isRequired
};

export default TrainingInformationView
