import React, {useCallback, useMemo, useState} from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import DefaultBlueTemplate from "../Templates/DefaultBlueTemplate";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

library.add(faAngleRight, faAngleLeft)

const MultipleTemplatesCarousel = ({
	                                   children,
	                                   initialChildIndex
                                   }) => {
	const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(initialChildIndex);

	const isNext = useMemo(
		() => selectedTemplateIndex !== React.Children.toArray(children).length - 1,
		[selectedTemplateIndex, children]
	);

	const isPrevious = useMemo(
		() => selectedTemplateIndex !== 0,
		[selectedTemplateIndex, children]
	);

	const onNavigationClick = useCallback(
		(mode = "next") => {
			switch (mode) {
				case "next": {
					setSelectedTemplateIndex(prevIndex => prevIndex + 1);
					break;
				}
				case "previous": {
					setSelectedTemplateIndex(prevIndex => prevIndex - 1);
				}
			}
		},
		[setSelectedTemplateIndex]
	);

	return <div className="multiple-templates-carousel-container">

		<span
			className={`carousel-navigation-button previous ${!isPrevious && "disabled"}`}
			onClick={onNavigationClick.bind(this, "previous")}
		>
			<FontAwesomeIcon
				icon={"angle-left"}
				className="carousel-navigation-icon"
			/>
		</span>
		<span>
			{
				React.Children.map(children, (child, index) =>
					index === selectedTemplateIndex ? child : undefined)
			}
		</span>
		<span
			className={`carousel-navigation-button next ${!isNext && "disabled"}`}
			onClick={onNavigationClick.bind(this, "next")}
		>
			<FontAwesomeIcon
				icon={"angle-right"}
				className="carousel-navigation-icon"
			/>
		</span>
	</div>
};

MultipleTemplatesCarousel.propTypes = {
	initialChildIndex: PropTypes.number
};
MultipleTemplatesCarousel.defaultProps = {
	initialChildIndex: 0
}

export default MultipleTemplatesCarousel
