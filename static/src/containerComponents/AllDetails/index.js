import React from 'react';
import './styles.scss';
import BasicInformation from "../../components/BasicInformation";
import EducationInformation from "../../components/EducationInformation";

const AllDetails = props => {
	return (
		<div className="allDetails-container">
			{/*<BasicInformation/>*/}
			<EducationInformation/>
		</div>
	)
};

AllDetails.propTypes = {};

export default AllDetails