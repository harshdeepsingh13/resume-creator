import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';

const ModernRedSummary = ({summaryInformation}) => {
	return <>
		<table className="inner-table">
			<tr className="section-header-container">
				<h4 className="section-header">
					Summary/Objective
				</h4>
			</tr>
			<tr className="section">
				<div className="summary">
					{
						summaryInformation
					}
				</div>
			</tr>
		</table>
	</>
};

ModernRedSummary.propTypes = {
	summaryInformation: PropTypes.string.isRequired
};

export default ModernRedSummary
