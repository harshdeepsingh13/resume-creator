import React, {useEffect, useRef, useState} from 'react';
import './styles.scss';
// import SolidBlueTemplate from "../../components/Templates/SolidBlueTemplate";
import {STATUS} from "../../config/config";
import {getCompleteResumeInformation} from "../../services/axios.service";
import Loader from "../../components/Loader";
import DefaultBlueTemplate from "../../components/Templates/DefaultBlueTemplate";
import {InputFields, InputSubmit} from "../../components/InputFields";
import MultipleTemplatesCarousel from "../../components/MultipleTemplatesCarousel";
import DefaultGrayTemplate from "../../components/Templates/DefaultGrayTemplate";
import ModernRedTemplate from "../../components/Templates/ModernRedTemplate";

const Templates = props => {
	const [information, setInformation] = useState({});
	const [informationFetchStatus, setInformationFetchStatus] = useState(STATUS.DEFAULT);

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
			return () => console.log("templates container unmount");
		},
		[]
	);


	return (
		<div className="templates-container">
			{
				informationFetchStatus === STATUS.STARTED &&
				<Loader
					containerStyles={{
						height: "calc(100vh - 70px)"
					}}
				/>
			}
			{
				informationFetchStatus === STATUS.SUCCESS &&
				<>
					<MultipleTemplatesCarousel>
						<ModernRedTemplate
							completeInformation={information}
						/>
						<DefaultBlueTemplate
							completeInformation={information}
						/>
						<DefaultGrayTemplate
							completeInformation={information}
						/>
					</MultipleTemplatesCarousel>
				</>
			}
		</div>
	);
};

Templates.propTypes = {};

export default Templates
