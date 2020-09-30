
import React, { useRef, useEffect, useState } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

import axios from 'axios';
import RequestAPI from "../Utils/API";

import './style/Leaflet.css';

export default function Leaflet(props) {

	const mapRef = useRef();

	const [manageLeaflet, setManageLeaflet] = useState({
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
	})

	/*state = {
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
	}*/

	const addMarker = (e) => {
		setManageLeaflet({ ...manageLeaflet, new: [e.latlng.lat, e.latlng.lng], center: [e.latlng.lat, e.latlng.lng] })
		props.displayReturn();
	}

	const modifyMarker = (e) => {
		setManageLeaflet({ modifyPopup: true })
		setManageLeaflet({ modifyName: this.state.activePark.name })
		setManageLeaflet({ modifyDescription: this.state.activePark.description })
	}

	const saveMarker = (e) => {
		setManageLeaflet({ savePopup: true })
	}

	const handleChange = (e) => {
		const value = e.target.value
		setManageLeaflet({ ...this.state, [e.target.name]: value })
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		const data = {
			lat: this.state.new[0],
			lon: this.state.new[1],
			name: this.state.newName,
			description: this.state.newDescription,
			user_id: 1,
			token: this.props.giveTok5en
		}

		RequestAPI("POST", "/places/create/position", data)
			.then(result => {
				if (result.status === 200) {
					this.props.addItem(data)
					this.setState({ savePopup: false, new: null })
					this.props.alert("Balise ajoutée")
				} else {
					this.props.alert("Erreur ajout")
				}
			}).catch(e => {
				this.props.alert("Erreur ajout")
			});
	}

	const handleModify = (e) => {
		e.preventDefault()
		const config = {
			headers: { Authorization: `Bearer ${this.props.giveToken}` }
		};

		const bodyParameters = {
			name: manageLeaflet.modifyName,
			description: manageLeaflet.modifyDescription,
			id: manageLeaflet.activePark.id
		}

		axios.put("http://ec2-18-218-63-27.us-east-2.compute.amazonaws.com:443/api/places/position", bodyParameters, config)
			.then(result => {
				if (result.status === 200) {
					setManageLeaflet({ modifyPopup: false, activePark: null })
					props.getItemIndex(null)
					props.updateItem()
					props.alert("Modification effectuée")
				} else {
					props.alert("Erreur modification")
				}
			}).catch(e => {
				props.alert("Erreur modification")
			});
	}

	const handleDelete = (e) => {
		e.preventDefault()
		const id = manageLeaflet.activePark.id
		const config = {
			headers: { Authorization: `Bearer ${props.giveToken}` }
		};
		axios.delete(`http://ec2-18-218-63-27.us-east-2.compute.amazonaws.com:443/api/places/delete/${id}`, config)
			.then(result => {
				if (result.status === 204) {
					setManageLeaflet({ modifyPopup: false, activePark: null })
					props.getItemIndex(null)
					props.removeItem(id)
					props.alert("Suppression effectuée")
				} else {
					props.alert("Erreur suppression")
				}
			}).catch(e => {
				props.alert("Erreur suppression")
			});
	}

	useEffect(() => {
		/*componentDidUpdate(prevProps) {
			// Utilisation classique (pensez bien à comparer les props) :
			if (this.props.fromAddressBar !== prevProps.fromAddressBar) {
				this.setState({ center: this.props.fromAddressBar });
				this.setState({ new: this.props.fromAddressBar });
			}state = {
		center: [48.854730, 2.346803],
		
		}*/
	}, [])

	return (
		<Map center={manageLeaflet.center} zoom={manageLeaflet.zoom} onClick={addMarker} ref={mapRef}	>

			{/* Fixed pin */}
			{props.items.map((pin, i) => (
				<Marker
					key={i}
					position={[
						pin.lat,
						pin.lon
					]}
					onClick={() => {
						const zoomValue = this.map && this.map.leafletElement.getZoom();
						setManageLeaflet({ zoom: zoomValue });
						setManageLeaflet({ activePark: pin })
						props.getItemIndex(this.state.activePark.id)
						setManageLeaflet({ center: [pin.lat, pin.lon] })
					}}
				/>
			))}

			{/* Fixed pin pop up */}
			{manageLeaflet.activePark && (
				<Popup className="Popup"
					position={[
						manageLeaflet.activePark.lat,
						manageLeaflet.activePark.lon
					]}
					onClose={() => {
						setManageLeaflet({ activePark: null });
						props.getItemIndex(null);
						setManageLeaflet({ modifyPopup: null });
					}}
				>
					{manageLeaflet.modifyPopup ?
						<div className="Popup-modify">
							<div className="Popup-modify-header">
								<h2>Modifier: </h2>
								<p>{manageLeaflet.modifyName}</p>
							</div>
							<hr />
							<form className="Popup-temp-adding-form" onSubmit={handleModify}>
								<label for="modifyName">Nom de balise</label>
								<input type="text" name="modifyName" placeholder={manageLeaflet.modifyName} onChange={handleChange} />
								<div className="Popup-temp-adding-form-geo">
									<h3>Géo : </h3>
									<p>{manageLeaflet.activePark.lat}, {manageLeaflet.activePark.lon}</p>
								</div>
								<label for="modifDescription">Description de la balise</label>
								<textarea name="modifyDescription" placeholder={manageLeaflet.modifyDescription} rows={6} onChange={handleChange} />
								<div className="Popup-modify-options">
									<button className="Popup-modify-options-button-delete" onClick={handleDelete}>SUPPRIMER</button>
									<input type="submit" value="MODIFIER" className="Popup-temp-adding-form-submit" />
								</div>
							</form>
						</div>
						:
						<div className="Popup-container">
							<div className="Popup-container-header">
								<h2>{manageLeaflet.activePark.name}: </h2>
								<p>balise numéro:{manageLeaflet.activePark.id}</p>
							</div>
							<hr />
							<div className="Popup-container-geo">
								<h3>Géo:</h3>
								<h4>{manageLeaflet.activePark.lat}, {manageLeaflet.activePark.lon}</h4>
							</div>
							<hr />
							<div className="Popup-container-description">
								<p>{manageLeaflet.activePark.description}</p>
							</div>
							<div className="Popup-container-options">
								<input type="submit" value="MODIFIER ?" onClick={manageLeaflet.modifyMarker} />
							</div>
						</div>}
				</Popup >
			)
			}

			{/* Temp pin */}
			{
				manageLeaflet.new && (
					<Marker
						key="new"
						position={manageLeaflet.new}
					/>
				)
			}

			{/* Temp pin pop up */}
			{
				manageLeaflet.new && (
					<Popup
						className="Popup"
						position={manageLeaflet.new}
						onClose={() => {
							setManageLeaflet({ new: null });
							setManageLeaflet({ savePopup: null })
						}}
					>
						{manageLeaflet.savePopup ?
							<div className="Popup-temp-adding">
								<h2>Ajouter: beacon</h2>
								<hr />
								<form className="Popup-temp-adding-form" onSubmit={handleSubmit}>
									<label for="newName">Nom de balise</label>
									<input type="text" name="newName" id="name" placeholder="Nom de balise" onChange={handleChange} />
									<div className="Popup-temp-adding-form-geo">
										<h3>Géo : </h3>
										<p>{manageLeaflet.new[0]}, {manageLeaflet.new[1]}</p>
									</div>
									<label for="newDescription">Description de la balise</label>
									<textarea name="newDescription" id="description" placeholder="Description de la balise" rows={6} onChange={handleChange} />
									<input type="submit" value="ENREGISTRER" className="Popup-temp-adding-form-submit" />
								</form>
							</div>
							:
							<div className="Popup-temp">
								<h3>Position</h3>
								<input type="submit" value="AJOUTER ?" onClick={saveMarker} />
							</div>
						}
					</Popup>
				)
			}

			{props.satelite ?
				<TileLayer
					url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
					attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
				/>
				:
				<TileLayer
					url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				/>
			}
		</Map >
	);
}

