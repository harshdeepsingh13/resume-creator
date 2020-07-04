import React, {useCallback} from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import {ICONS_PNG, MONTHS} from "../../../config/config";

const ModernRedPersonalInformation = ({
	                                      information: {
		                                      contactNumber,
		                                      website,
		                                      socialMediaLinks,
		                                      currentLocation,
		                                      dob
	                                      }
                                      }) => {

	const getSocialIcon = useCallback(
		(socialMedia) => {
			switch (socialMedia) {
				case "linkedin":
					return ICONS_PNG.LINKEDIN_ICON;
				case "github":
					return ICONS_PNG.GITHUB_ICON;
				case "instagram":
					return ICONS_PNG.INSTAGRAM_ICON;
				case "facebook":
					return ICONS_PNG.FACEBOOK_ICON;
				default:
					return ""
			}
		},
		[]
	)

	return <>
		<span className="spacer medium"/>
		<table className="inner-table">
			<tr className="section-header-container">
				<h4 className="section-header">
					Personal Information
				</h4>
			</tr>
			<tr className="section personalInformation-container">
				<span className="spacer small"/>
				<table className="inner-table">
					{
						dob &&
						<tr className="dob">
							<td className="key">
								<img
									className="personalInformation-icon"
									src={ICONS_PNG.CALENDAR_ICON}
									alt="dobIcon"
								/>
							</td>
							<td className="value">
								{
									`${new Date(dob).getDate()} ${MONTHS[new Date(dob).getMonth()]} ${new Date(dob).getFullYear()}`
								}
							</td>
						</tr>
					}
					{
						currentLocation &&
						<tr className="location">
							<td className="key">
								<img
									src={ICONS_PNG.LOCATION_ICON}
									alt="locationIcon"
									className="personalInformation-icon"
								/>
							</td>
							<td className="value">
								{
									`${currentLocation.state}, ${currentLocation.country}`
								}
							</td>
						</tr>
					}
					{
						contactNumber &&
						<tr className="contact">
							<td className="key">
								<img
									src={ICONS_PNG.CONTACT_ICON}
									alt="contactIcon"
									className="personalInformation-icon"
								/>
							</td>
							<td className="value">
								{
									`${contactNumber}`
								}
							</td>
						</tr>
					}
					{
						website &&
						<tr className="website">
							<td className="key">
								<img
									src={ICONS_PNG.WEBSITE_ICON}
									alt="websiteIcon"
									className="personalInformation-icon"
								/>
							</td>
							<td className="value">
								<a
									href={website.trim()}
									className="link"
									target="_blank"
								>{website.trim()}</a>
							</td>
						</tr>
					}
					{
						Object.entries(socialMediaLinks).map(([
							                                      socialMediaKey,
							                                      socialMediaValue
						                                      ]) => (
							<tr className="socialMediaLinks">
								<td className="key">
									<img
										src={getSocialIcon(socialMediaKey)}
										alt={`socialMediaIcon - ${socialMediaKey}`}
										className="personalInformation-icon"
									/>
								</td>
								<td className="value">
									<a
										href={socialMediaValue.trim()}
										className="link"
										target="_blank"
									>{socialMediaValue.trim()}</a>
								</td>
							</tr>
						))
					}
				</table>
			</tr>
		</table>
	</>
};

ModernRedPersonalInformation.propTypes = {
	information: PropTypes.shape({
		contactNumber: PropTypes.number,
		website: PropTypes.string,
		socialMediaLinks: PropTypes.object,
		currentLocation: PropTypes.shape({
			city: PropTypes.string,
			country: PropTypes.string
		}),
		dob: PropTypes.string
	}).isRequired
};

export default ModernRedPersonalInformation
