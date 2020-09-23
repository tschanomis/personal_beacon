import React from 'react';

import './style/Home.css';

import LeafletNude from '../components/LeafletNude.js';
import CardForm from '../components/CardForm.js';

class Home extends React.Component {
	render() {
		return (
			<div className="Home">
				<CardForm getToken={this.props.getToken} alert={this.props.alert} />
				<LeafletNude />
			</div>
		);
	}
}

export default Home;
