import React, {useRef} from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import PDFExport from "@progress/kendo-react-pdf/dist/es/PDFExport";
import {getItem} from "../../../services/cookies.service";
import {InputFields, InputSubmit} from "../../InputFields";
import ResumeHeader from "../ResumeHeader";
import SummaryView from "../SummaryView";
import SkillsInformationView from "../SkillsInformationView";
import EducationInformationView from "../EducationInformationView";
import ProjectInformationView from "../ProjectInformationView";
import WorkExperienceInformationView from "../WorkExperienceInformationView";
import PersonalInformationView from "../PersonalInformationView";
import TrainingInformationView from "../TrainingInformationView";

const DefaultBlueTemplate = React.forwardRef(({completeInformation: information}, ref) => {
	const theme = 'default-blue';

	return (
		<div className="defaultBlueTemplate-container template-container">
			<>
				<PDFExport
					paperSize={'A4'}
					fileName={`${getItem().name.split(' ').join('_')}.pdf`}
					ref={ref}
					scale={0.6}
					margin={"4mm"}
				>
					<table className="template-table">
						<tbody>
						<tr className="resumeHeader-container">
							<ResumeHeader
								basicInformation={information.basicInformation}
								theme={theme}
							/>
						</tr>
						<tr>
							<SummaryView
								summaryInformation={information.basicInformation.objective}
								theme={theme}
							/>
						</tr>
						{
							information.skillsInformation.skills.length ?
								<tr>
									<SkillsInformationView
										skills={information.skillsInformation.skills}
										theme={theme}
									/>
								</tr> :
								undefined
						}
						{
							information.educationInformation.educationInformation.educations.length ?
								<tr>
									<EducationInformationView
										educations={information.educationInformation.educationInformation.educations}
										theme={theme}
									/>
								</tr> :
								undefined
						}
						{
							information.projects.projectsInformation.projects.length ?
								<tr>
									<ProjectInformationView
										projects={information.projects.projectsInformation.projects}
										theme={theme}
									/>
								</tr> :
								undefined
						}
						<tr>
							{
								information.workExperienceInformation.workExperienceInformation.workExperiences.length ?
									<WorkExperienceInformationView
										workExperiences={information.workExperienceInformation.workExperienceInformation.workExperiences}
										theme={theme}
									/> :
									undefined
							}
						</tr>
						<tr>
							{
								information.trainingInformation.trainingInformation.trainings.length ?
									<TrainingInformationView
										trainingsCertifications={information.trainingInformation.trainingInformation.trainings}
										theme={theme}
									/> :
									undefined
							}
						</tr>
						<tr>
							<PersonalInformationView
								information={information.basicInformation}
								theme={theme}
							/>
						</tr>
						</tbody>
					</table>
				</PDFExport>
			</>
		</div>
	)
});

DefaultBlueTemplate.propTypes = {
	completeInformation: PropTypes.object.isRequired
};

export default DefaultBlueTemplate
