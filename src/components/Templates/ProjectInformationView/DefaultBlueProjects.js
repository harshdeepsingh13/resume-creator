import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import ProjectView from "./ProjectView";

const DefaultBlueProjects = ({projects}) => {
	return <>
		<span className="spacer medium"/>
		<table className="inner-table">
			<tr className="section-header-container">
				<h4 className="section-header">
					Projects
				</h4>
			</tr>
			<tr className="section">
				<span className="spacer small"/>
				{
					projects.map(project =>
						<ProjectView
							project={project}
						/>)
				}
			</tr>
		</table>
	</>
};

DefaultBlueProjects.propTypes = {
	projects: PropTypes.array.isRequired
};

export default DefaultBlueProjects
