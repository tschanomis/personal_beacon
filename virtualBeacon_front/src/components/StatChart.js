import React, { Component } from "react";
import Chart from "react-apexcharts";
import moment from 'moment';

import './style/ColumnChart.css';

class StatChart extends Component {
	constructor(props) {
		super(props);

		this.state = {
			options: {
				chart: {
					id: "basic-bar"
				},
				xaxis: {
					categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
				},
				colors: "#2ab5ac",
				borderRadius: "100px"
			},
			/*series: [
				{
					name: "series-1",
					data: [30, 40, 45, 50, 49, 60, 70, 91]
				}
			]*/
		}
	}

	componentDidMount = () => {
		const dates = []
		for (let i = 7; i >= 0; i--) {
			dates.push(moment().subtract(i, 'days').format('D/MM'))
		}
		this.setState(prevState => ({
			options: {
				...prevState.options,
				xaxis: {
					categories: dates
				}
			}
		}))
	}

	render() {
		return (
			<div className="Statchart">
				<div className="row">
					<div className="mixed-chart">
						<Chart
							options={this.state.options}
							series={this.props.series}
							type="bar"
							width="80%"
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default StatChart;
