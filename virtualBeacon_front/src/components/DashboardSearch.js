import React from 'react';
import axios from 'axios';

import './style/DashboardSearch.css';

class DashboardSearch extends React.Component {

	state = {
		start: '',
		suggestions: [],
	}

	handleSubmit = (e) => {
		e.preventDefault();
		//this.getStations(this.state.coord[0], this.state.coord[1])
	}

	handleChange = (e) => {
		this.setState({ start: e.target.value }, () => {
			if (this.state.start.length >= 0) {
				this.getAdress();
			}
		})
	}

	getAdress = () => {
		axios.get('https://api-adresse.data.gouv.fr/search/', {
			params: {
				q: this.state.start,
				limit: '5',
				lat: 48.8534,
				lon: 2.3488,
				city: "Paris",
			},
		}).then(response => response.data.features)
			.then(value => this.setState({ suggestions: value }))
	}

	getStations = (lat, lon) => {
		/*const zoom = this.state.zoom
		axios.post('http://ec2-18-218-63-27.us-east-2.compute.amazonaws.com/api/places/position', {
			latitude: latitude,
			longitude: longitude,
			rayon: (18 - zoom) * 250
		})
			.then(response => this.setState({ items: response.data }))*/
		this.props.getAddress(lat, lon)
	}

	suggestionsSelected(value) {
		this.setState(() => ({
			start: value.properties.label,
			suggestions: [],
			coord: value.geometry.coordinates
		}))
		const tabCoord = (value.geometry.coordinates.reverse())
		this.getStations(tabCoord[0], tabCoord[1])
		this.setState({ bool: true })
		this.setState({ start: value.properties.label })
	}

	renderSugegestions() {
		const { suggestions } = this.state
		if (suggestions.length === 0) {
			return null
		}
		return (
			<ul className="result">
				{suggestions.map(item => (
					<li
						onClick={() => this.suggestionsSelected(item)}
						key={item.properties.label}
					>
						{item.properties.label}
					</li>
				))}
			</ul>
		)
	}

	render() {
		return (
			<div className="DashboardSearch">
				<h5>RECHERCHE ADRESSE</h5>
				<div className="AutoCompleteText">
					<form onSubmit={this.handleSubmit}>
						<input
							className="AutoCompleteText-input"
							id="start"
							name="start"
							type="text"
							value={this.state.start}
							onChange={this.handleChange}
							placeholder="Adresse"
							autoComplete="off"
						/>
						{this.renderSugegestions()}
					</form>
				</div>
			</div>
		);
	}
}

export default DashboardSearch;
