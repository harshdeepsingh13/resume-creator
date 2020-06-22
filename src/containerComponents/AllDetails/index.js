import React from 'react';
import './styles.scss';
import BasicInformation from "../../components/BasicInformation";
import EducationInformation from "../../components/EducationInformation";
import CoreSkillsInformation from '../../components/CoreSkillsInformation'
import UniversalTabsView from "../UniversalTabsView";
import WorkExperienceInformation from "../../components/WorkExperienceInformation";
import ProjectsInformation from '../../components/ProjectsInformation';
import TrainingsCertifications from "../../components/TrainingsCertifications"

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
						},
						{
							tabHeader: 'Work Experiences',
							componentToRender: <WorkExperienceInformation/>
						},
						{
							tabHeader: 'Projects',
							componentToRender: <ProjectsInformation/>
						},
						{
							tabHeader: "Trainings & Certifications",
							componentToRender: <TrainingsCertifications/>
						}
					]
				}
				styles={
					{
						width: '80%'
					}
				}
			/>
		</div>
	)
};

AllDetails.propTypes = {};

export default AllDetails
