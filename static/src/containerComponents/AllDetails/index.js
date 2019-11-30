import React from 'react';
import './styles.scss';
import BasicInformation from "../../components/BasicInformation";
import EducationInformation from "../../components/EducationInformation";
import CoreSkills from '../../components/CoreSkillsInformation'

const AllDetails = props => {
	return (
		<div className="allDetails-container">
			{/*<BasicInformation/>*/}
			{/*<EducationInformation/>*/}
			<CoreSkills/>
		</div>
	)
};

AllDetails.propTypes = {};

export default AllDetails