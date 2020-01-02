import React, {useEffect, useState} from 'react';
import './styles.scss';
// import SolidBlueTemplate from "../../components/Templates/SolidBlueTemplate";
import {STATUS} from "../../config/config";
import {getCompleteResumeInformation} from "../../services/axios.service";
import Loader from "../../components/Loader";
import DefaultBlueTemplate from "../../components/Templates/DefaultBlueTemplate";

const Templates = props => {
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
		<div className="resumeTemplates-container">
			{
				informationFetchStatus === STATUS.STARTED &&
				<Loader/>
			}
			{
				informationFetchStatus === STATUS.SUCCESS &&
				/*<SolidBlueTemplate
					completeInformation={information}
				/>*/
				<DefaultBlueTemplate
					completeInformation={information}
				/>
			}
		</div>
	)
};

Templates.propTypes = {};

export default Templates