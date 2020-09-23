import React from 'react';

import axios from 'axios';

import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';
import Overlay from 'pigeon-overlay';

import './style/Find.css';

class Find extends React.Component {
	state = {
		start: '',
		suggestions: [],
		coord: [48.8528, 2.3473],
		items: [],
		zoom: 14,
		bool: true
	}

	handleZoom = (e) => {
		e.target.value === '+' ? this.setState({ zoom: this.state.zoom + 1 }) : this.setState({ zoom: this.state.zoom - 1 })
		this.getStations(this.state.coord[0], this.state.coord[1])
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.getStations(this.state.coord[0], this.state.coord[1])
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

	getStations = (latitude, longitude) => {
		const zoom = this.state.zoom
		axios.post('http://ec2-18-218-63-27.us-east-2.compute.amazonaws.com/api/places/position', {
			latitude: latitude,
			longitude: longitude,
			rayon: (18 - zoom) * 250
		})
			.then(response => this.setState({ items: response.data }))
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
			<div className="Find">
				<div className="bloc-input">
					<div className="AutoCompleteText">
						<form onSubmit={this.handleSubmit}>
							<input
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
					<div className="zoom-button">
						<button onClick={this.handleZoom} value="-">-</button>
						<button onClick={this.handleZoom} value="+">+</button>
					</div>
				</div>

				<div className="Container-result">
					<div className="Block-map--info">
						<Map center={this.state.coord} zoom={this.state.zoom} width={800} height={400} >
							<Marker anchor={this.state.coord} payload={1} onClick={this.handleClick} />
							{this.state.items.map((item, i) => <Overlay key={i} anchor={[parseFloat(item.geo.split(',')[0]), parseFloat(item.geo.split(',')[1])]}>
								<img src='https://pngimage.net/wp-content/uploads/2018/05/bicycle-logo-png-1.png' width={40} height={20} alt='pin-velo' />
							</Overlay>)}
						</Map>
					</div>
					<div className="Block-map--details">
						{this.state.items.length > 0 ?
							this.state.items.map((item, i) => <div key={i} style={{ backgroundColor: i % 2 === 0 ? 'lightgray' : '' }}> id : {item.id} - nom : {item.Nom_de_la_station} - vélos mécaniques : {item.Nombre_de_vélo_mécanique} - vélos électriques : {item.Nombre_vélo_électrique} - distance : {Math.round(item.distance)}m</div>)
							:
							''
						}
					</div>
				</div>
			</div>
		)
	}
}

export default Find;
