import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import './style/Home.css';

import LeafletNude from '../components/LeafletNude.js';
import CardForm from '../components/CardForm.js';

export default function Home(props) {

	const cookies = useCookies()
	const [redirect, setRedirect] = useState(false)

	useEffect(() => {
		if (cookies['userTokenBeacon']) {
			setRedirect("/dashboard")
		}
	}, [cookies])

	return (
		<div className="Home">
			{redirect && <Route path="about" render={() => <Navigate to={redirect} />} />}
			<CardForm alert={props.alert} />
			<LeafletNude />
		</div>
	);
}

