import React, {useCallback, useRef} from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import {getItem} from "../../../services/cookies.service";
import PDFExport from "@progress/kendo-react-pdf/dist/es/PDFExport";
import ResumeHeader from "../ResumeHeader";
import {InputFields, InputSubmit} from "../../InputFields";
import SkillsInformationView from "../SkillsInformationView";
import SummaryView from "../SummaryView";
import EducationInformationView from "../EducationInformationView";
import ProjectInformationView from "../ProjectInformationView";
import WorkExperienceInformationView from "../WorkExperienceInformationView";
import TrainingInformationView from "../TrainingInformationView";
import PersonalInformationView from "../PersonalInformationView";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faCircleNotch} from "@fortawesome/free-solid-svg-icons";

library.add(faCircleNotch)

const ModernRedTemplate = ({completeInformation: information}) => {
	const theme = "modern-red";
	const resumeRef = useRef(undefined);

	const exportPdf = useCallback(
		() => resumeRef.current.save(),
		[resumeRef]
	);

	return <>
		<div className="resumeTemplates-container">
			<div className="template-container modernRedTemplate-container">
				<>
					<PDFExport
						paperSize={'A4'}
						fileName={`${getItem().name.split(' ').join('_')}.pdf`}
						ref={resumeRef}
						scale={0.7}
						margin={"1mm 4mm"}
					>
						<table className="template-table">
							<tbody>
							<ResumeHeader
								basicInformation={information.basicInformation}
								theme={theme}
							/>
							<span className="spacer large"/>
							<tr>
								<td className="left-side">
									<table className="inner-table">
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
										<tr>
											<PersonalInformationView
												information={information.basicInformation}
												theme={theme}
											/>
										</tr>
									</table>
								</td>
								<td className="right-side">
									<table className="inner-table">
										<tr>
											<SummaryView
												summaryInformation={information.basicInformation.objective}
												theme={theme}
											/>
										</tr>
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
									</table>
								</td>
							</tr>
							<tr>
								<td className="left-side">
									<table className="inner-table">
									</table>
								</td>
								<td className="right-side">
									<table className="inner-table">
										{
											information.workExperienceInformation.workExperienceInformation.workExperiences.length ?
												<tr>
													<WorkExperienceInformationView
														workExperiences={information.workExperienceInformation.workExperienceInformation.workExperiences}
														theme={theme}
													/>
												</tr> :
												undefined
										}
									</table>
								</td>
							</tr>
							<tr>
								<td className="left-side">
									<table className="inner-table">
									</table>
								</td>
								<td className="right-side">
									<table className="inner-table">
										{
											information.trainingInformation.trainingInformation.trainings.length ?
												<tr>
													<TrainingInformationView
														trainingsCertifications={information.trainingInformation.trainingInformation.trainings}
														theme={theme}
													/>
												</tr> :
												undefined
										}
									</table>
								</td>
							</tr>
							</tbody>
						</table>
					</PDFExport>
				</>
			</div>
			<div className="selected-template-name">
				<h5>Modern Red</h5>
			</div>
		</div>
		<InputFields
			styles={
				{
					position: "sticky",
					bottom: "10px",
					margin: "auto"
				}
			}
		>
			<InputSubmit
				text={"Download PDF"}
				handleClick={exportPdf}
			/>
		</InputFields>
	</>

};

ModernRedTemplate.propTypes = {
	completeInformation: PropTypes.object.isRequired
};

export default ModernRedTemplate
