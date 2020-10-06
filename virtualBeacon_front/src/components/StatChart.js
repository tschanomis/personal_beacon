import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import moment from 'moment';

import './style/ColumnChart.css';

export default function StatChart(props) {

	const [manageStatChart, setManageStatChart] = useState({
		options: {
			chart: {
				id: "basic-bar"
			},
			xaxis: {
				categories: []
			},
			colors: "#2ab5ac",
			borderRadius: "100px"
		}
	})

	useEffect(() => {
		const dates = []
		for (let i = 7; i >= 0; i--) {
			dates.push(moment().subtract(i, 'days').format('D/MM'))
		}
		setManageStatChart(manageStatChart => ({ ...manageStatChart, options: { ...manageStatChart.options, xaxis: { categories: dates } } }))
	}, [])

	return (
		<div className="Statchart">
			<div className="row">
				<div className="mixed-chart">
					<Chart
						options={manageStatChart.options}
						series={props.series}
						type="bar"
						width="80%"
					/>
				</div>
			</div>
		</div>
	);
}
