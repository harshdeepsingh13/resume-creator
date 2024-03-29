import React, {useState} from "react";
import PropTypes from "prop-types";
import {getCloudinaryImageLink} from "../../../services/utils";

const DefaultBlueResumeHeader = ({theme, basicInformation}) => {
	const [isAvatarReady, setIsAvatarReady] = useState(false);

	const handleAvatarOnLoad = () => {
		setIsAvatarReady(true);
	};

	return (
		<>
			<td className="useravatar-container">
				<span className="userAvatarImage-container"><img
					src={getCloudinaryImageLink(basicInformation.avatar.uploadId)}
					alt="User Avatar"
					onLoad={handleAvatarOnLoad}
					style={{display: isAvatarReady ? "" : "none"}}
				/></span>
			</td>
			<td>
				<table className="inner-table">
					<tr>
					<span className="name">
						{
							basicInformation.name
						}
					</span>
					</tr>
					<tr className="tags tag">
						{
							basicInformation.tags[0]
						}
					</tr>
					<tr>
					<span className="email">
						<a
							href={`mailto:${basicInformation.email}`}
							className="link"
							target="_blank"
						>
							{
								basicInformation.email
							}
						</a>
					</span>
					</tr>
					<tr>
					<span className="location">
						{
							`${basicInformation.currentLocation.state}, ${basicInformation.currentLocation.country}`
						}
					</span>
					</tr>
				</table>
			</td>
		</>
	)
};
DefaultBlueResumeHeader.propTypes = {
	theme: PropTypes.string.isRequired,
	basicInformation: PropTypes.object.isRequired
};

export default DefaultBlueResumeHeader;
