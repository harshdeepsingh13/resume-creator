import React from 'react';
import './styles.scss';
import BasicInformation from "../../components/BasicInformation";
import EducationInformation from "../../components/EducationInformation";
import CoreSkillsInformation from '../../components/CoreSkillsInformation'
import UniversalTabsView from "../UniversalTabsView";

const AllDetails = props => {
	return (
		<div className="allDetails-container">
			<UniversalTabsView
				tabs={
					[
						{
							tabHeader: 'Basic Info',
							componentToRender: <BasicInformation/>
						},
						{
							tabHeader: 'Education Details',
							componentToRender: <EducationInformation/>
						},
						{
							tabHeader: 'Skills',
							componentToRender: <CoreSkillsInformation/>
						}
					]
				}
				styles={
					{
						width: '50%'
					}
				}
			/>
		</div>
	)
};

AllDetails.propTypes = {};

export default AllDetails