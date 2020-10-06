import React, { useState } from 'react';
import axios from 'axios';

import './style/DashboardSearch.css';

export default function DashboardSearch(props) {

	const [search, setSearch] = useState('')
	const [suggestions, setSuggestions] = useState([])

	const handleChange = (e) => {
		axios.get('https://api-adresse.data.gouv.fr/search/', {
			mode: 'cors',
			params: {
				q: search + e.target.value,
				limit: '5'
			},
		}).then(result => setSuggestions(result.data.features))
		setSearch(e.target.value)
	}

	const suggestionsSelected = (value) => {
		setSuggestions([])
		setSearch(value.properties.label)
		const tabCoord = (value.geometry.coordinates.reverse())
		console.log(tabCoord)
		props.getAddress(tabCoord[0], tabCoord[1])
	}

	return (
		<div className="DashboardSearch">
			<h5>RECHERCHE ADRESSE</h5>
			<div className="SuggestionsText">
				<form>
					<input
						className="SuggestionsText-input"
						id="start"
						name="adress_bar"
						type="text"
						value={search}
						onChange={handleChange}
						placeholder="Adresse"
						autoComplete="off"
					/>
					{suggestions.length >= 1 ?
						<ul className="SuggestionsText-result">
							{suggestions.map(item => (
								<li
									onClick={() => suggestionsSelected(item)}
									key={item.properties.label}
								>
									{item.properties.label}
								</li>
							))}
						</ul> : null}
				</form>
			</div>
		</div>
	);
}