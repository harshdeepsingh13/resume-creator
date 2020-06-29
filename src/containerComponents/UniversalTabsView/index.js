import React, {useState} from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import {STYLE_CONSTANTS} from "../../config/config";

const UniversalTabsView = (props) => {
	const {tabs, styles, initialTabIndex} = props;
	const [currentTab, setCurrentTab] = useState(initialTabIndex);

	return (
		<div
			className="universalTabs-container"
			style={{
				...styles
			}}
		>
			<div className="tabs">
				<div className="tabsHeader-container">
					{
						tabs.map(({tabHeader}, index) => (
							<div
								key={index}
								className="tabHeader Text-Style-2"
								style={
									{
										borderBottom: currentTab === index &&
											`2px solid ${STYLE_CONSTANTS.PRIMARY_COLORS.PRIMARY_YELLOWISH}`
									}
								}
								onClick={() => setCurrentTab(index)}
							>
								{
									tabHeader
								}
							</div>
						))
					}
				</div>
				<div className="tabsView-container">
					{
						tabs[currentTab].componentToRender
					}
				</div>
			</div>
		</div>
	)
};

UniversalTabsView.propTypes = {
	tabs: PropTypes.arrayOf(PropTypes.shape({
		tabHeader: PropTypes.string.isRequired,
		componentToRender: PropTypes.object.isRequired
	})).isRequired,
	styles: PropTypes.object,
	initialTabIndex: PropTypes.number
};
UniversalTabsView.defaultProps = {
	initialTabIndex: 0
}

export default UniversalTabsView
