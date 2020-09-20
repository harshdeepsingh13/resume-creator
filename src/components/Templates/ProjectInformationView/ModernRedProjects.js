import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import ProjectView from "./ProjectView";

const ModernRedProjects = ({projects}) => {
	return <>
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

ModernRedProjects.propTypes = {
	projects: PropTypes.array.isRequired
};

export default ModernRedProjects
