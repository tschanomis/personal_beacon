import React, { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import RequestAPI from "../Utils/API";
import moment from 'moment';

import './style/Stats.css';

import StatChart from './StatChart';
import { Navigate } from 'react-router-dom';

export default function Stats() {

	const [cookies, setCookie] = useCookies()
	const [redirect, setRedirect] = useState(null)
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
			token: cookies["userTokenBeacon"]
		}).then(result => {
			if (result.status === 200) {
				const classifyResult = []
				for (let i = 7; i >= 0; i--) {
					classifyResult.push((result.data.filter(element => (moment(element.created_at).format('YYYY-MM-D')) === moment().subtract(i, 'days').format('YYYY-MM-D'))).length)
				};
				setManageStats(manageStats => ({ ...manageStats, series: [{ name: "Activations", data: classifyResult }] }))
			} else {
				setCookie()
				setRedirect("/")
			}
		}).catch(e => {
			setCookie()
			setRedirect("/")
		});
	}, [cookies, setCookie])

	return (
		<div className="Stats">
			{redirect && <Navigate to={redirect} />}
			<StatChart series={manageStats.series} />
		</div>
	);
}