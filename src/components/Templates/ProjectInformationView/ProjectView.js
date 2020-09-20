import {MONTHS} from "../../../config/config";
import PropTypes from "prop-types";
import React from "react";

const ProjectView = ({
	                     project: {
		                     name,
		                     startDate,
		                     endDate,
		                     isPresent,
		                     summary,
		                     link
	                     }
                     }) => {
	return (
		<tr className="project-container">
			<table className="inner-table">
				<tr className="nameDuration-container">
					<td className="name">
						{
							name
						}
					</td>
					<td className="duration">
						{
							isPresent ?
								'Still in development' :
								`${MONTHS[new Date(startDate).getMonth()]} ${new Date(startDate).getFullYear()} - ${MONTHS[new Date(endDate).getMonth()]} ${new Date(endDate).getFullYear()}`
						}
					</td>
				</tr>
				<tr className="summary">
					<td colSpan={2}>
						{
							summary
						}
					</td>
				</tr>
				<tr className="link-container">
					<td colSpan={2}>
						<b>Link:</b> <a
						href={link}
						className="link"
						target="_blank"
					>{link}</a>
					</td>
				</tr>
			</table>
			<span className="spacer small"/>
		</tr>
	)
};
ProjectView.propTypes = {
	project: PropTypes.shape({
		name: PropTypes.string,
		startDate: PropTypes.string,
		endDate: PropTypes.string,
		isPresent: PropTypes.bool,
		summary: PropTypes.string,
		link: PropTypes.string,
	}).isRequired,
};

export default ProjectView;
