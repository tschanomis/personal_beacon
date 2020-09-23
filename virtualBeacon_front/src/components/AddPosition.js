import React from 'react';

import './style/AddPosition.css';
import axios from 'axios';

class AddPosition extends React.Component {
	state = {
		latitude: null,
		longitude: null,
		nom: null,
		items: []
	}

	handleChange = (e) => {
		const value = e.target.value
		this.setState({ [e.target.name]: value })
	}

	createPosition = () => {
		const latitude = this.state.latitude
		const longitude = this.state.longitude
		const nom = this.state.nom
		axios.post('http://ec2-18-218-63-27.us-east-2.compute.amazonaws.com/api/places/create/position', {
			latitude: latitude,
			longitude: longitude,
			nom: nom
		})
			.then(response => alert(response.data.Nom_de_la_station + ' ajouté'))
		//.catch(error => console.log(error))
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.createPosition()
	}

	render() {
		return (
			<div className="AddPosition">
				<div className="Card">
					<form className="addForm" onSubmit={this.handleSubmit}>
						<label>
							Latitude
							<input type="number" step="any" name="latitude" placeholder="Latitude" value={this.state.latitude} onChange={this.handleChange} />
						</label>
						<label>
							Longitude
							<input type="number" step="any" name="longitude" placeholder="Longitude" onChange={this.handleChange} />
						</label>
						<label>
							Nom de la station
							<input type="text" name="nom" placeholder="Nom de station" onChange={this.handleChange} />
						</label>
						<input type="submit" value="Ajouter" />
					</form>
				</div>
			</div>
		);
	}
}

export default AddPosition;
