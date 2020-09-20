import React, {useState} from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import {getCloudinaryImageLink} from "../../../services/utils";

const ModernRedResumeHeader = ({
	                               basicInformation,
	                               theme
                               }) => {
	const [isAvatarReady, setIsAvatarReady] = useState(false);

	const handleAvatarOnLoad = () => {
		setIsAvatarReady(true);
	};

	return <>
		<td className="useravatar-container left-side">
			<span className="header-design"/>
			<span className="userAvatarImage-container"><img
				src={getCloudinaryImageLink(basicInformation.avatar.uploadId)}
				alt="User Avatar"
				onLoad={handleAvatarOnLoad}
				style={{display: isAvatarReady ? "" : "none"}}
			/></span>
		</td>
		<td className="right-side userDetails-container">
			<table className="inner-table">
				<tr><span className="name">{basicInformation.name}</span></tr>
				<tr className="tags tag">{basicInformation.tags[0]}</tr>
				<tr className="contactNumber">{basicInformation.contactNumber}</tr>
				<tr className="email">
					<a
						href={`mailto:${basicInformation.email}`}
						className="link"
						target="_blank"
					>
						{
							basicInformation.email
						}
					</a>
				</tr>
				<tr className="location">{`${basicInformation.currentLocation.state}, ${basicInformation.currentLocation.country}`}</tr>
			</table>
		</td>
	</>
};

ModernRedResumeHeader.propTypes = {
	basicInformation: PropTypes.object.isRequired,
	theme: PropTypes.string.isRequired
};

export default ModernRedResumeHeader
