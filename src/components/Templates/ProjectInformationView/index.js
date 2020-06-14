import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import {MONTHS} from '../../../config/config';

const ProjectInformationView = ({
	                                projects,
	                                theme
                                }) => {
	return (
		<td className={`projectInformationView-container ${theme}`}>
			<span className="spacer medium"/>
			<table className="inner-table">
				<tr className="section-header-container">
					<h4 className="section-header">
						Projects
					</h4>
				</tr>
				<tr className="section">
					{
						projects.map(project => (
							<ProjectView
								project={project}
							/>
						))
					}
				</tr>
			</table>
		</td>
	)
};

ProjectInformationView.propTypes = {
	projects: PropTypes.array.isRequired,
	theme: PropTypes.string.isRequired
};

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
			<span className="spacer small"/>
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

export default ProjectInformationView
