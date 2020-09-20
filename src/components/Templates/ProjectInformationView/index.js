import React, {useMemo} from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import ModernRedProjects from "./ModernRedProjects";
import DefaultBlueProjects from "./DefaultBlueProjects";

const ProjectInformationView = ({
	                                projects,
	                                theme
                                }) => {
	const ProjectsInformationComponent = useMemo(
		() => {
			switch (theme) {
				case "default-blue":
				case "default-gray":
					return DefaultBlueProjects
				case "modern-red":
					return ModernRedProjects
				default:
					return () => <></>
			}
		},
		[theme]
	);

	return (
		<td className={`projectInformationView ${theme}`}>
			<ProjectsInformationComponent projects={projects}/>
		</td>
	)
};

ProjectInformationView.propTypes = {
	projects: PropTypes.array.isRequired,
	theme: PropTypes.string.isRequired
};

export default ProjectInformationView
