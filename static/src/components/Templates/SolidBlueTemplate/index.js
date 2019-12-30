import React, {useEffect, useRef, useState} from 'react';
import './styles.scss';
import PDFExport from "@progress/kendo-react-pdf/dist/es/PDFExport";
import {getItem} from "../../../services/localStorage.service";
import {InputFields, InputSubmit} from "../../InputFields";
import {STATUS} from "../../../config/config"
import {getCompleteResumeInformation} from "../../../services/axios.service";
import Loader from "../../Loader";
import ResumeHeader from "../ResumeHeader";
import EducationInformationView from "../EducationInformationView";

const SolidBlueTemplate = props => {
	const resumeRef = useRef(undefined);
	const exportPdf = () => resumeRef.current.save();
	const [information, setInformation] = useState({});
	const [informationFetchStatus, setInformationFetchStatus] = useState(STATUS.DEFAULT);

	useEffect(
		() => {
			(async () => {
				setInformationFetchStatus(STATUS.STARTED);
				const {data: {data: completeInformation}} = await getCompleteResumeInformation();
				console.log('complete information ', completeInformation);
				setInformation(
					{
						...completeInformation
					}
				);
				setInformationFetchStatus(STATUS.SUCCESS);
			})();
		},
		[]
	);

	return (
		<div className="solidBlueTemplate-container template-container">
			{
				informationFetchStatus === STATUS.STARTED &&
				<Loader/>
			}
			{
				informationFetchStatus === STATUS.SUCCESS &&
				<>
					<PDFExport
						paperSize={'Letter'}
						fileName={`${getItem().name.split(' ').join('_')}.pdf`}
						ref={resumeRef}
						// margin={20}
					>
						<table className="template-table">
							<tbody>
							<tr className="resumeHeader-container">
								<ResumeHeader
									basicInformation={information.basicInformation}
									theme={'solid-blue'}
								/>
							</tr>
							<tr>
								<EducationInformationView
									theme={'solid-blue'}
									educations={information.educationInformation.educationInformation.educations}
								/>
							</tr>
							</tbody>
						</table>
					</PDFExport>
					<InputFields>
						<InputSubmit
							text={"Download PDF"}
							handleClick={exportPdf}
						/>
					</InputFields>
				</>
			}
		</div>
	)
};

SolidBlueTemplate.propTypes = {};

export default SolidBlueTemplate


/*
*
* {<tr>
								<td className="left-pannel-bookmark">
									<div/>
								</td>
								<td colSpan={2}>
									<ResumeHeader
										basicInformation={information.basicInformation}
										theme={"solid-blue"}
									/>
								</td>
							</tr>
							<tr>
								<td className="left-pannel-bookmark">
									<div/>
								</td>
								<td>
									<EducationInformationView
										educations={information.educationInformation.educationInformation.educations}
										theme={'solid-blue'}
									/>
								</td>
								<td>
									<SkillsInformationView
										skills={information.skillsInformation.skills}
										theme={"solid-blue"}
									/>
								</td>
							</tr>
}*/