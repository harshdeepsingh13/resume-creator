import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';

const DefaultBlueSummary = ({summaryInformation}) => {
	return <>
		<span className="spacer medium"/>
		<table className="inner-table">
			<tr className="section-header-container">
				<h4 className="section-header">
					Summary/Objective
				</h4>
			</tr>
			<span className="spacer small"/>
			<tr className="section">
				<div className="summary">
					{
						summaryInformation
					}
				</div>
			</tr>
		</table>
		<span className="spacer large"/>
	</>

};

DefaultBlueSummary.propTypes = {
	summaryInformation: PropTypes.string.isRequired
};

export default DefaultBlueSummary
