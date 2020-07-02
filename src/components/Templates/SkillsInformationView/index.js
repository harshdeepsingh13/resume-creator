import React, {useEffect, useState} from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import Tag from "../../Tag";
import {STYLE_CONSTANTS} from '../../../config/config';

const SkillsInformationView = ({skills, theme}) => {
	const [color, setColor] = useState(undefined);
	useEffect(
		() => {
			switch (theme) {
				case 'solid-blue': {
					setColor(STYLE_CONSTANTS.TEMPLATE_CONSTANTS.SOLID_BLUE_TEMPLATE.PRIMARY);
					break;
				}
				case 'default-blue': {
					setColor(STYLE_CONSTANTS.TEMPLATE_CONSTANTS.DEFAULT_BLUE_TEMPLATE.PRIMARY_DARK);
					break;
				}
				case "default-gray": {
					setColor(STYLE_CONSTANTS.TEMPLATE_CONSTANTS.DEFAULT_GRAY_TEMPLATE.PRIMARY_DARK);
					break;
				}
				default: {
					setColor(STYLE_CONSTANTS.PRIMARY_COLORS.PRIMARY_ORANGE);
					break;
				}
			}
		},
		[]
	);
	return (
		<td className="skillsInformationView-container">
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
								tagText={skill}
								toClose={false}
								styles={
									{
										'background-color': color
									}
								}
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
