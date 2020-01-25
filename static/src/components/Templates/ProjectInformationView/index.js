import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';

const ProjectInformationView = ({
	                                projects,
	                                theme
                                }) => {
	return (
		<td className={`projectInformationView-container ${theme}`}>
			<span className="spacer medium"/>
			<tr className="section-header-container">
				<h4 className="section-header">
					Projects
				</h4>
			</tr>
			<tr className="section">
				<span className="spacer small"/>
				{
					projects.map((project, index) => (
						<ProjectView
							project={project}
							index={index}
						/>
					))
				}
			</tr>
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
	                     },
	                     index
                     }) => {
	return (
		<tr className="project-container">
			{
				index !== 0 &&
				<span className="spacer small"/>
			}
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
							`${new Date(startDate).toLocaleDateString().slice(3)} - ${new Date(endDate).toLocaleDateString().slice(3)}`
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
			{<span className="spacer small"/>}
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
	index: PropTypes.number.isRequired
}

export default ProjectInformationView