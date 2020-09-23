import React from 'react';

import axios from 'axios';

import './style/DeletePosition.css';

class DeletePosition extends React.Component {
	state = {
		nom_station: null,
	}

	handleChange = (e) => {
		const value = e.target.value
		this.setState({ [e.target.name]: value })
	}

	deletePosition = () => {
		const nom = this.state.nom_station
		axios.delete(`http://ec2-18-218-63-27.us-east-2.compute.amazonaws.com/api/places/delete/${nom}`)
			.then(response => console.log(response, nom + ' supprimé'))
		//.catch(error => console.log(error))
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.deletePosition()
	}

	render() {
		return (
			<div className="DeletePosition">
				<div className="Card">
					<form className="DeleteForm" onSubmit={this.handleSubmit}>
						<label>
							Station à supprimer
							<input type="text" name="nom_station" placeholder="Nom station" value={this.state.nom_station} onChange={this.handleChange} />
						</label>
						<input type="submit" value="Supprimer"></input>
					</form>
				</div>
			</div>
		);
	}
}

export default DeletePosition;
