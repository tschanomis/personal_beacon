import React from 'react';

import './style/Home.css';

import LeafletNude from '../components/LeafletNude.js';
import CardForm from '../components/CardForm.js';

export default function Home(props) {
	return (
		<div className="Home">
			<CardForm getToken={props.getToken} alert={props.alert} />
			<LeafletNude />
		</div>
	);
}

