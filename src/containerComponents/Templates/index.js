import React, {useEffect, useRef, useState} from 'react';
import './styles.scss';
// import SolidBlueTemplate from "../../components/Templates/SolidBlueTemplate";
import {STATUS} from "../../config/config";
import {getCompleteResumeInformation} from "../../services/axios.service";
import Loader from "../../components/Loader";
import DefaultBlueTemplate from "../../components/Templates/DefaultBlueTemplate";
import {InputFields, InputSubmit} from "../../components/InputFields";

const Templates = props => {
	const [information, setInformation] = useState({});
	const [informationFetchStatus, setInformationFetchStatus] = useState(STATUS.DEFAULT);
	const resumeRef = useRef(undefined);


	useEffect(
		() => {
			(async () => {
				setInformationFetchStatus(STATUS.STARTED);
				const {data: {data: completeInformation}} = await getCompleteResumeInformation();
				delete (completeInformation.basicInformation.socialMediaLinks._id);
				delete (completeInformation.basicInformation.socialMediaLinks.updatedAt);
				delete (completeInformation.basicInformation.socialMediaLinks.createdAt);
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

	const exportPdf = () => resumeRef.current.save();

	return (
		<div className="templates-container">
			{
				informationFetchStatus === STATUS.STARTED &&
				<Loader/>
			}
			{
				informationFetchStatus === STATUS.SUCCESS &&
				<>
					<div className="resumeTemplates-container">

						{/*<SolidBlueTemplate
							completeInformation={information}
						/>*/}
						<DefaultBlueTemplate
							completeInformation={information}
							ref={resumeRef}
						/>

					</div>
					<div className="selected-template-name">
						<h5>Default Blue</h5>
					</div>
					<InputFields
						styles={
							{
								position: "sticky",
								bottom: "10px",
								width: "60%",
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
			}
		</div>
	);
};

Templates.propTypes = {};

export default Templates
