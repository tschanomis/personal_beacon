import React, { useState, useEffect } from 'react';
import RequestAPI from "../Utils/API";
import moment from 'moment';

import './style/Stats.css';

import StatChart from './StatChart';

export default function Stats(props) {

	const [manageStats, setManageStats] = useState({
		series: [
			{
				name: "",
				data: []
			}
		]
	})

	useEffect(() => {
		RequestAPI("GET", "/logs", {
			token: props.giveToken
		}).then(result => {
			if (result.status === 200) {
				const classifyResult = []
				for (let i = 7; i >= 0; i--) {
					classifyResult.push((result.data.filter(element => (moment(element.created_at).format('YYYY-MM-D')) === moment().subtract(i, 'days').format('YYYY-MM-D'))).length)
				};
				setManageStats({ ...manageStats, series: [{ name: "Activations", data: classifyResult }] })
			} else {
				console.log("erreur", result.status)
			}
		}).catch(e => {
			console.log("erreur", e.status)
			props.getTokenError()
		});
	}, [])

	return (
		<div className="Stats">
			<StatChart series={manageStats.series} />
		</div>
	);
}