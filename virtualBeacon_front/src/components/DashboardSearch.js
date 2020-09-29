import React, { useState } from 'react';
import axios from 'axios';

import './style/DashboardSearch.css';
import { useEffect } from 'react';

export default function DashboardSearch(props) {

	const [search, setSearch] = useState('')
	const [suggestions, setSuggestions] = useState([])

	const handleSubmit = (e) => {
		//e.preventDefault();
		//this.getStations(this.state.coord[0], this.state.coord[1])
	}

	const handleChange = (e) => {
		axios.get('https://api-adresse.data.gouv.fr/search/', {
			mode: 'cors',
			params: {
				q: search + e.target.value,
				limit: '5',
				lat: 48.8534,
				lon: 2.3488,
				city: "Paris",
			},
		}).then(result => setSuggestions(result.data.features))
		setSearch(e.target.value)
	}

	/*const getStations = (lat, lon) => {
		/*const zoom = this.state.zoom
		axios.post('http://ec2-18-218-63-27.us-east-2.compute.amazonaws.com/api/places/position', {
			latitude: latitude,
			longitude: longitude,
			rayon: (18 - zoom) * 250
		})
			.then(response => this.setState({ items: response.data }))
		this.props.getAddress(lat, lon)
	}*/

	/*const suggestionsSelected = (value) => {
		setManageDashboardSearch(() => ({
			start: value.properties.label,
			suggestions: [],
			coord: value.geometry.coordinates
		}))
		const tabCoord = (value.geometry.coordinates.reverse())
		props.getStations(tabCoord[0], tabCoord[1])
		setManageDashboardSearch({ ...manageDashboardSearch, bool: true })
		setManageDashboardSearch({ ...manageDashboardSearch, start: value.properties.label })
	}*/

	/*const renderSugegestions = () => {
		const { suggestions } = manageDashboardSearch
		if (suggestions.length === 0) {
			console.log("nope")
			return null
		}
		console.log("yep")
		return (
			<ul className="result">
				{suggestions.map(item => (
					<li
						onClick={() => suggestionsSelected(item)}
						key={item.properties.label}
					>
						{item.properties.label}
					</li>
				))}
			</ul>
		)
	}*/

	return (
		<div className="DashboardSearch">
			<h5>RECHERCHE ADRESSE</h5>
			<div className="AutoCompleteText">
				<form onSubmit={handleSubmit}>
					<input
						className="AutoCompleteText-input"
						id="start"
						name="start"
						type="text"
						value={search.start}
						onChange={handleChange}
						placeholder="Adresse"
						autoComplete="off"
					/>
				</form>
			</div>
		</div>
	);
}

