import React from 'react';
import axios from 'axios';
import moment from 'moment';

import './style/Stats.css';

import StatChart from './StatChart';

class Stats extends React.Component {

	state = {
		stats: [],
		series: [
			{
				name: "",
				data: []
			}
		]
	}

	componentDidMount = () => {
		const token = this.props.giveToken
		const config = {
			headers: { Authorization: `Bearer ${token}` }
		}

		axios.get("http://ec2-18-218-63-27.us-east-2.compute.amazonaws.com:443/api/logs", config
		)
			.then(result => {
				if (result.status === 200) {
					const stats = result.data
					this.setState({ stats: stats })
					const classifyResult = []
					for (let i = 7; i >= 0; i--) {
						classifyResult.push((this.state.stats.filter(element => (moment(element.created_at).format('YYYY-MM-D')) === moment().subtract(i, 'days').format('YYYY-MM-D'))).length)
					};
					this.setState({ series: [{ name: "Activations", data: classifyResult }] })
				} else {
					console.log("erreur")
				}
			}).catch(e => {
				console.log("erreur")
				this.props.getTokenError()
			});
	}

	render() {
		return (
			<div className="Stats">
				<StatChart series={this.state.series} />
			</div>
		);
	}
}

export default Stats;
