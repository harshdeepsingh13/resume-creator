import React, {useEffect} from 'react';
import './styles.scss';
import SolidBlueResumeHeader from "./SolidBlueResumeHeader";
import DefaultBlueResumeHeader from "./DefaultBlueResumeHeader";
import PropTypes from 'prop-types';
import {library} from "@fortawesome/fontawesome-svg-core";
import {faMobileAlt} from "@fortawesome/free-solid-svg-icons";

library.add(faMobileAlt);

const ResumeHeader = ({theme, basicInformation}) => {

	useEffect(
		() => {
			delete basicInformation.socialMediaLinks._id;
			delete basicInformation.socialMediaLinks.createdAt;
			delete basicInformation.socialMediaLinks.updatedAt;
		},
		[]
	);
	return (
		<tr className={`resumeHeader ${theme}`}>
			{
				theme === "solid-blue" &&
				<SolidBlueResumeHeader
					basicInformation={basicInformation}
					theme={theme}
				/>
			}
			{
				theme === 'default-blue' &&
				<DefaultBlueResumeHeader
					basicInformation={basicInformation}
					theme={theme}
				/>
			}
		</tr>
	)
};

ResumeHeader.propTypes = {
	theme: PropTypes.string.isRequired,
	basicInformation: PropTypes.object.isRequired
};

export default ResumeHeader