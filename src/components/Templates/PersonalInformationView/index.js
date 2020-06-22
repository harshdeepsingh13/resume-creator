import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import {MONTHS} from '../../../config/config';

const PersonalInformationView = ({
	                                 information: {
		                                 contactNumber,
		                                 website,
		                                 socialMediaLinks,
		                                 currentLocation,
		                                 dob
	                                 },
	                                 theme
                                 }) => {
	return (
		<td className={`personalInformationView-container ${theme}`}>
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
									Date of Birth:
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
									Location:
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
									Contact:
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
									Website:
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
										{
											`${socialMediaKey.charAt(0).toUpperCase()}${socialMediaKey.slice(1)}:`
										}
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
		</td>
	)

};

PersonalInformationView.propTypes = {
	information: PropTypes.shape({
		contactNumber: PropTypes.number,
		website: PropTypes.string,
		socialMediaLinks: PropTypes.object,
		currentLocation: PropTypes.shape({
			city: PropTypes.string,
			country: PropTypes.string
		}),
		dob: PropTypes.string
	}).isRequired,
	theme: PropTypes.string.isRequired
};

export default PersonalInformationView
