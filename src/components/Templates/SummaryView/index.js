import React, {useCallback} from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import DefaultBlueSummary from "./DefaultBlueSummary";
import ModernRedSummary from "./ModernRedSummary";


const SummaryView = ({summaryInformation, theme}) => {

	const SummaryComponent = useCallback(
		() => {
			switch (theme) {
				case "default-blue":
				case "default-gray":
					return <DefaultBlueSummary
						summaryInformation={summaryInformation}
					/>
				case "modern-red":
					return <ModernRedSummary
						summaryInformation={summaryInformation}
					/>
				default:
					return <></>
			}
		},
		[theme]
	)
	return (
		<td className={`summary-container ${theme}`}>
			{
				SummaryComponent()
			}
		</td>
	)
};

SummaryView.propTypes = {
	summaryInformation: PropTypes.string.isRequired,
	theme: PropTypes.string.isRequired
};

export default SummaryView
