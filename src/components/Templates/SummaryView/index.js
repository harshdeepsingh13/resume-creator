import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';

const SummaryView = ({summaryInformation, theme}) => {
	return (
		<td className={`summary-container ${theme}`}>
			<span className="spacer medium"/>
			<tr className="section-header-container">
				<h4 className="section-header">
					Summary/Objective
				</h4>
			</tr>
			<span className="spacer small"/>
			<tr className="section">
				<span className="summary">
					{
						summaryInformation
					}
				</span>
			</tr>
			<span className="spacer large"/>
		</td>
	)
};

SummaryView.propTypes = {
	summaryInformation: PropTypes.string.isRequired,
	theme: PropTypes.string.isRequired
};

export default SummaryView