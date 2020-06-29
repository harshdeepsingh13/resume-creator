import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {STYLE_CONSTANTS} from "../../config/config";

library.add(faTimes);

const Tag = props => {
	const {
		id,
		tagText,
		onClose,
		width,
		toClose,
		styles
	} = props;
	return (
		<div
			className="tag-container"
			style={
				{
					width
				}
			}
		>
			<div
				className="tag"
				style={
					{
						'background-color': STYLE_CONSTANTS.PRIMARY_COLORS.PRIMARY_ORANGE,
						...styles
					}
				}
			>
				<span>
					{
						tagText
					}
				</span>
				{
					toClose &&
					<span
						className="close-container"
						onClick={onClose.bind(this, id)}
					>
						<FontAwesomeIcon
							icon={"times"}
							color={STYLE_CONSTANTS.BACKGROUND_AND_BORDERS.GREY_DARK}
						/>
					</span>
				}
			</div>
		</div>
	)
};

Tag.propTypes = {
	id: PropTypes.number.isRequired,
	tagText: PropTypes.string.isRequired,
	onClose: PropTypes.func,
	toClose: PropTypes.bool,
	width: PropTypes.string,
	styles: PropTypes.object
};
Tag.defaultProps = {
	id: -1,
	tagText: "Default Tag",
	onClose: () => console.log('Tag on close'),
	width: undefined,
	toClose: true
};

export default Tag