import React, {useEffect, useRef, useState} from 'react';
import ReactDOMServer from 'react-dom/server';
import './styles.scss';
import PropTypes from 'prop-types';
import {MONTHS, STYLE_CONSTANTS} from "../../../config/config";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import canvg from "canvg";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faMobileAlt} from "@fortawesome/free-solid-svg-icons";
import {getCloudinaryImageLink} from "../../../services/utils";

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
		</tr>
	)
};

ResumeHeader.propTypes = {
	theme: PropTypes.string.isRequired,
	basicInformation: PropTypes.object.isRequired
};

const SolidBlueResumeHeader = ({theme, basicInformation}) => {

	const [canLoadSVG, setCanLoadSVG] = useState(false);
	const [isAvatarReady, setIsAvatarReady] = useState(false);
	const canvasRef = useRef(undefined);
	const [iconsInThePage, setIconsInThePage] = useState({
		email: {
			fwIcon: "at"
		},
		phone: {
			fwIcon: "mobile-alt"
		},
		location: {
			fwIcon: "map-marker-alt"
		},
		dob: {
			fwIcon: "calendar-day"
		},
		website: {
			fwIcon: 'globe'
		},
		linkedin: {
			fwIcon: ["fab", 'linkedin']
		},
		github: {
			fwIcon: ['fab', 'github']
		},
		instagram: {
			fwIcon: ['fab', 'instagram']
		},
		facebook: {
			fwIcon: ['fab', 'facebook']
		}
	});
	const convertSVGsToImages = () => {
		let update = {};
		let fwIconColor = "";
		switch (theme) {
			case "solid-blue":
				fwIconColor = STYLE_CONSTANTS.TEMPLATE_CONSTANTS.SOLID_BLUE_TEMPLATE.PRIMARY_DARK;
				break;
			default:
				fwIconColor = STYLE_CONSTANTS.PRIMARY_COLORS.PRIMARY_REDDISH;
				break;
		}
		for (let property of Object.keys(iconsInThePage)) {
			console.log('property', property, iconsInThePage[property].fwIcon);
			let atFontAwesomeString = ReactDOMServer.renderToStaticMarkup(
				<FontAwesomeIcon
					icon={iconsInThePage[property].fwIcon}
					size={'3x'}
					color={fwIconColor}
					style={
						{
							width: "500px",
							height: "500px"
						}
					}
				/>
			);
			canvg(canvasRef.current, atFontAwesomeString);
			update[property] = {
				fwIcon: iconsInThePage[property].fwIcon,
				pngIcon: canvasRef.current.toDataURL('image/png')
			};
		}
		setIconsInThePage(
			{
				...iconsInThePage,
				...update
			}
		);
		setCanLoadSVG(true);
	};
	const handleAvatarOnLoad = () => {
		setIsAvatarReady(true);
	};

	useEffect(
		() => {
			convertSVGsToImages();
		},
		[]
	)

	return (
		<>
			{
				!canLoadSVG &&
				<canvas ref={canvasRef} style={{display: "none"}}/>
			}
			<td>
				<tr className="name">
					{basicInformation.name}
				</tr>
				<tr className="tags tag">
					{
						basicInformation.tags[0]
					}
				</tr>
				<tr className="objective">
					{basicInformation.objective}
				</tr>
			</td>
			<td className="useravatar-container">
				<img
					src={getCloudinaryImageLink(basicInformation.avatar.uploadId)}
					alt="User Avatar"
					onLoad={handleAvatarOnLoad}
					style={{display: isAvatarReady ? "" : "none"}}
				/>
			</td>
			<td className="contactInformation-container">
				<tr className="email">
						<span className="value">
							{
								basicInformation.email
							}
						</span>
					<span className="icon">
							{
								canLoadSVG && <img src={iconsInThePage.email.pngIcon} alt={"Email SVG"}/>
							}
						</span>
				</tr>
				<tr className="phone">
						<span className="value">
							{
								basicInformation.contactNumber
							}
						</span>
					<span className="icon">
							{
								canLoadSVG && <img src={iconsInThePage.phone.pngIcon} alt="Phone SVG"/>
							}
						</span>
				</tr>
				<tr className="location">
						<span className="value">
							{
								`${basicInformation.currentLocation.state}, ${basicInformation.currentLocation.country}`
							}
						</span>
					<span className="icon">
							{
								canLoadSVG &&
								<img src={iconsInThePage.location.pngIcon} alt="Location SVG"/>
							}
						</span>
				</tr>
				<tr className="dob">
						<span className="value">
							{
								`${new Date(basicInformation.dob).getDate()} ${MONTHS[new Date(basicInformation.dob).getMonth()]}, ${new Date(basicInformation.dob).getFullYear()}`
							}
						</span>
					<span className="icon">
							{
								canLoadSVG &&
								<img src={iconsInThePage.dob.pngIcon} alt="Date of Birth SVG"/>
							}
						</span>
				</tr>
				<tr className="website">
						<span className="value">
							{
								basicInformation.website
							}
						</span>
					<span className="icon">
							{
								canLoadSVG &&
								<img src={iconsInThePage.website.pngIcon} alt="Website SVG"/>
							}
						</span>
				</tr>
				{
					Object.keys(basicInformation.socialMediaLinks).map(socialmedia => (
						<>
							<tr className="socialMedia">
								<span className="value">
									{
										basicInformation.socialMediaLinks[socialmedia]
									}
								</span>
								<span className="icon">
									{
										canLoadSVG &&
										<img src={iconsInThePage[socialmedia].pngIcon}
										     alt={`${socialmedia} SVG`}/>
									}
								</span>
							</tr>
						</>
					))
				}
			</td>
		</>
	)
};

SolidBlueResumeHeader.propTypes = {
	theme: PropTypes.string.isRequired,
	basicInformation: PropTypes.object.isRequired
};

export default ResumeHeader