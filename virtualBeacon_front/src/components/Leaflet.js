
import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

import axios from 'axios';

import './style/Leaflet.css';

class Leaflet extends React.Component {

	state = {
		center: [48.854730, 2.346803],
		zoom: 14,
		activePark: null,
		new: null,
		modifyPopup: false,
		savePopup: false,
		newName: null,
		newDescription: null,
		modifyName: null,
		modifyDescription: null,
	}

	addMarker = (e) => {
		this.props.displayReturn();
		const zoomValue = this.map && this.map.leafletElement.getZoom();
		this.setState({ zoom: zoomValue });
		this.setState({ new: [e.latlng.lat, e.latlng.lng] });
		this.setState({ center: [e.latlng.lat, e.latlng.lng] });
	}

	modifyMarker = (e) => {
		this.setState({ modifyPopup: true })
		this.setState({ modifyName: this.state.activePark.name })
		this.setState({ modifyDescription: this.state.activePark.description })
	}

	saveMarker = (e) => {
		this.setState({ savePopup: true })
	}

	handleChange = (e) => {
		const value = e.target.value
		this.setState({ ...this.state, [e.target.name]: value })
	}

	handleSubmit = (e) => {
		e.preventDefault()

		const config = {
			headers: { Authorization: `Bearer ${this.props.giveToken}` }
		};

		const bodyParameters = {
			lat: this.state.new[0],
			lon: this.state.new[1],
			name: this.state.newName,
			description: this.state.newDescription,
			user_id: 1
		}

		axios.post("http://ec2-18-218-63-27.us-east-2.compute.amazonaws.com:443/api/places/create/position", bodyParameters, config)
			.then(result => {
				if (result.status === 200) {
					this.props.addItem(bodyParameters)
					this.setState({ savePopup: false, new: null })
					this.props.alert("Balise ajoutée")
				} else {
					this.props.alert("Erreur ajout")
				}
			}).catch(e => {
				this.props.alert("Erreur ajout")
			});
	}

	handleModify = (e) => {
		e.preventDefault()
		const config = {
			headers: { Authorization: `Bearer ${this.props.giveToken}` }
		};

		const bodyParameters = {
			name: this.state.modifyName,
			description: this.state.modifyDescription,
			id: this.state.activePark.id
		}

		axios.put("http://ec2-18-218-63-27.us-east-2.compute.amazonaws.com:443/api/places/position", bodyParameters, config)
			.then(result => {
				if (result.status === 200) {
					this.setState({ modifyPopup: false, activePark: null })
					this.props.getItemIndex(null)
					this.props.updateItem()
					this.props.alert("Modification effectuée")
				} else {
					this.props.alert("Erreur modification")
				}
			}).catch(e => {
				this.props.alert("Erreur modification")
			});
	}

	handleDelete = (e) => {
		e.preventDefault()
		const id = this.state.activePark.id
		const config = {
			headers: { Authorization: `Bearer ${this.props.giveToken}` }
		};
		axios.delete(`http://ec2-18-218-63-27.us-east-2.compute.amazonaws.com:443/api/places/delete/${id}`, config)
			.then(result => {
				if (result.status === 204) {
					this.setState({ modifyPopup: false, activePark: null })
					this.props.getItemIndex(null)
					this.props.removeItem(id)
					this.props.alert("Suppression effectuée")
				} else {
					this.props.alert("Erreur suppression")
				}
			}).catch(e => {
				this.props.alert("Erreur suppression")
			});
	}

	componentDidUpdate(prevProps) {
		// Utilisation classique (pensez bien à comparer les props) :
		if (this.props.fromAddressBar !== prevProps.fromAddressBar) {
			this.setState({ center: this.props.fromAddressBar });
			this.setState({ new: this.props.fromAddressBar });
		}
	}

	render() {
		return (
			<Map center={this.state.center} zoom={this.state.zoom} onClick={this.addMarker} ref={(ref) => { this.map = ref }}	>

				{/* Fixed pin */}
				{this.props.items.map((pin, i) => (
					<Marker
						key={i}
						position={[
							pin.lat,
							pin.lon
						]}
						onClick={() => {
							const zoomValue = this.map && this.map.leafletElement.getZoom();
							this.setState({ zoom: zoomValue });
							this.setState({ activePark: pin })
							this.props.getItemIndex(this.state.activePark.id)
							this.setState({ center: [pin.lat, pin.lon] })
						}}
					/>
				))}

				{/* Fixed pin pop up */}
				{this.state.activePark && (
					<Popup className="Popup"
						position={[
							this.state.activePark.lat,
							this.state.activePark.lon
						]}
						onClose={() => {
							this.setState({ activePark: null });
							this.props.getItemIndex(null);
							this.setState({ modifyPopup: null });
						}}
					>
						{this.state.modifyPopup ?
							<div className="Popup-modify">
								<div className="Popup-modify-header">
									<h2>Modifier: </h2>
									<p>{this.state.modifyName}</p>
								</div>
								<hr />
								<form className="Popup-temp-adding-form" onSubmit={this.handleModify}>
									<label for="modifyName">Nom de balise</label>
									<input type="text" name="modifyName" placeholder={this.state.modifyName} onChange={this.handleChange} />
									<div className="Popup-temp-adding-form-geo">
										<h3>Géo : </h3>
										<p>{this.state.activePark.lat}, {this.state.activePark.lon}</p>
									</div>
									<label for="modifDescription">Description de la balise</label>
									<textarea name="modifyDescription" placeholder={this.state.modifyDescription} rows={6} onChange={this.handleChange} />
									<div className="Popup-modify-options">
										<button className="Popup-modify-options-button-delete" onClick={this.handleDelete}>SUPPRIMER</button>
										<input type="submit" value="MODIFIER" className="Popup-temp-adding-form-submit" />
									</div>
								</form>
							</div>
							:
							<div className="Popup-container">
								<div className="Popup-container-header">
									<h2>{this.state.activePark.name}: </h2>
									<p>balise numéro:{this.state.activePark.id}</p>
								</div>
								<hr />
								<div className="Popup-container-geo">
									<h3>Géo:</h3>
									<h4>{this.state.activePark.lat}, {this.state.activePark.lon}</h4>
								</div>
								<hr />
								<div className="Popup-container-description">
									<p>{this.state.activePark.description}</p>
								</div>
								<div className="Popup-container-options">
									<input type="submit" value="MODIFIER ?" onClick={this.modifyMarker} />
								</div>
							</div>}
					</Popup >
				)
				}

				{/* Temp pin */}
				{
					this.state.new && (
						<Marker
							key="new"
							position={this.state.new}
						/>
					)
				}

				{/* Temp pin pop up */}
				{
					this.state.new && (
						<Popup
							className="Popup"
							position={this.state.new}
							onClose={() => {
								this.setState({ new: null });
								this.setState({ savePopup: null })
							}}
						>
							{this.state.savePopup ?
								<div className="Popup-temp-adding">
									<h2>Ajouter: beacon</h2>
									<hr />
									<form className="Popup-temp-adding-form" onSubmit={this.handleSubmit}>
										<label for="newName">Nom de balise</label>
										<input type="text" name="newName" id="name" placeholder="Nom de balise" onChange={this.handleChange} />
										<div className="Popup-temp-adding-form-geo">
											<h3>Géo : </h3>
											<p>{this.state.new[0]}, {this.state.new[1]}</p>
										</div>
										<label for="newDescription">Description de la balise</label>
										<textarea name="newDescription" id="description" placeholder="Description de la balise" rows={6} onChange={this.handleChange} />
										<input type="submit" value="ENREGISTRER" className="Popup-temp-adding-form-submit" />
									</form>
								</div>
								:
								<div className="Popup-temp">
									<h3>Position</h3>
									<input type="submit" value="AJOUTER ?" onClick={this.saveMarker} />
								</div>
							}
						</Popup>
					)
				}

				{this.props.satelite ?
					<TileLayer
						url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
						attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
					/>
					:
					<TileLayer
						url="http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png"
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					/>
				}
			</Map >
		);
	}
}

export default Leaflet

