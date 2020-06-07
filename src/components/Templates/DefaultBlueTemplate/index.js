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

const DefaultBlueTemplate = ({completeInformation: information}) => {
	const theme = 'default-blue';

	const resumeRef = useRef(undefined);
	const exportPdf = () => resumeRef.current.save();

	return (
		<div className="defaultBlueTemplate-container template-container">
			<>
				<PDFExport
					paperSize={'A4'}
					fileName={`${getItem().name.split(' ').join('_')}.pdf`}
					ref={resumeRef}
					// scale={0.6}
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
						<tr>
							<SkillsInformationView
								skills={information.skillsInformation.skills}
								theme={theme}
							/>
						</tr>
						<tr>
							<EducationInformationView
								educations={information.educationInformation.educationInformation.educations}
								theme={theme}
							/>
						</tr>
						<tr>
							<ProjectInformationView
								projects={information.projects.projectsInformation.projects}
								theme={theme}
							/>
						</tr>
						<tr>
							<WorkExperienceInformationView
								workExperiences={information.workExperienceInformation.workExperienceInformation.workExperiences}
								theme={theme}
							/>
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
				<InputFields
					styles={
						{
							position: "sticky",
							bottom: "10px"
						}
					}
				>
					<InputSubmit
						text={"Download PDF"}
						handleClick={exportPdf}
					/>
				</InputFields>
			</>
		</div>
	)
};

DefaultBlueTemplate.propTypes = {
	completeInformation: PropTypes.object.isRequired
};

export default DefaultBlueTemplate
