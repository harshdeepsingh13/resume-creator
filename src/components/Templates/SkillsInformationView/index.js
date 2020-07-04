import React, {useEffect, useState} from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import Tag from "../../Tag";
import {STYLE_CONSTANTS} from '../../../config/config';

const SkillsInformationView = ({skills, theme}) => {

	return (
		<td className={`skillsInformationView-container ${theme}`}>
			<table className="inner-table">
				<tr className='section-header-container'>
					<h4 className="section-header">
						Skills
					</h4>
				</tr>
				<tr className="section tags-container">
					{
						skills.map((skill, index) => (
							<Tag
								key={index}
								tagText={theme === "modern-red" ? () => <>
									<span style={{
										fontSize: "1.5em",
										fontStyle: "italic",
										fontWeight: "bold",
										textTransform: "capitalize",
										color: STYLE_CONSTANTS.TEMPLATE_CONSTANTS.MODERN_RED_TEMPLATE.PRIMARY_DARK
									}}>{skill.charAt(0)}</span>
									<span>{skill.slice(1)}</span>
								</> : skill}
								toClose={false}
							/>
						))
					}
				</tr>
			</table>
		</td>
	)
};

SkillsInformationView.propTypes = {
	skills: PropTypes.array.isRequired,
	theme: PropTypes.string.isRequired
};

export default SkillsInformationView
