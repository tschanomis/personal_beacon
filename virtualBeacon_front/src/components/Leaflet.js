import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useCookies } from 'react-cookie';

import RequestAPI from "../Utils/API";

import LeafletMin from './LeafletMin';

import './style/Leaflet.css';

/*const iconPerson = new L.Icon({
	iconUrl: require('../marker-icon.png'),
});*/

export default function Leaflet(props) {

	const mapRef = useRef()
	const [cookies] = useCookies()
	const [satellite, setSatellite] = useState(false)
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

	const addMarker = (e) => {
		console.log("hello click");
		const zoom = mapRef.current.leafletElement.getZoom()
		const center = mapRef.current.leafletElement.getCenter()
		const coord = [e.latlng.lat, e.latlng.lng]
		setManageLeaflet(manageLeaflet => ({ ...manageLeaflet, new: coord, center: center, zoom: zoom }));
		props.displayReturn();
	}

	const saveMarker = () => {
		setManageLeaflet({ ...manageLeaflet, savePopup: true })
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		const data = {
			lat: manageLeaflet.new[0],
			lon: manageLeaflet.new[1],
			name: manageLeaflet.newName,
			description: manageLeaflet.newDescription,
			token: cookies['userTokenBeacon']
		}

		RequestAPI("POST", "/places/create/position", data)
			.then(result => {
				if (result.status === 200) {
					data.id = result.data.id
					props.addItem(data)
					setManageLeaflet({ ...manageLeaflet, savePopup: false, new: null })
					props.alert("Balise ajoutée")
				} else {
					props.alert("Erreur ajout")
				}
			}).catch(e => {
				props.alert("Erreur ajout")
			});
	}

	const modifyMarker = () => {
		setManageLeaflet(manageLeaflet => ({
			...manageLeaflet,
			modifyPopup: true,
			modifyName: manageLeaflet.activePark.name,
			modifyDescription: manageLeaflet.activePark.description,
		}))
	}

	const handleDelete = (e) => {
		e.preventDefault()
		const id = manageLeaflet.activePark.id
		RequestAPI("DELETE", `/places/delete/${id}`, {
			token: cookies['userTokenBeacon']
		}).then(result => {
			if (result.status === 204) {
				setManageLeaflet(manageLeaflet => ({
					...manageLeaflet,
					modifyPopup: false,
					activePark: null
				}))
				props.removeItem(id)
				props.alert("Suppression effectuée")
			} else {
				props.alert("Erreur suppression")
			}
		}).catch(e => {
			props.alert("Erreur suppression")
		});
	}

	const handleChange = (e) => {
		setManageLeaflet({ ...manageLeaflet, [e.target.name]: e.target.value })
	}

	const handleModify = (e) => {
		e.preventDefault()

		const data = {
			name: manageLeaflet.modifyName,
			description: manageLeaflet.modifyDescription,
			id: manageLeaflet.activePark.id,
			token: cookies['userTokenBeacon']
		}

		RequestAPI("PUT", "/places/position", data)
			.then(result => {
				if (result.status === 200) {
					setManageLeaflet(manageLeaflet => ({
						...manageLeaflet,
						modifyPopup: false,
						activePark: null
					}))
					props.updateItem(data)
					props.alert("Modification effectuée")
				} else {
					props.alert("Erreur modification")
				}
			}).catch(e => {
				props.alert("Erreur modification")
			});
	}

	const viewportChange = () => {
		if (manageLeaflet.activePark === null && manageLeaflet.new === null) {
			const zoom = mapRef.current.leafletElement.getZoom()
			const center = mapRef.current.leafletElement.getCenter()
			setManageLeaflet(manageLeaflet => ({ ...manageLeaflet, zoom: zoom, center: center }))
		}
	}

	useEffect(() => {
		const address = props.fromAddressBar
		setManageLeaflet(manageLeaflet => (
			{ ...manageLeaflet, center: address, new: address }
		))
	}, [props.fromAddressBar])

	return (
		<>
			<MapContainer ref={mapRef} center={manageLeaflet.center} zoom={manageLeaflet.zoom} onClick={addMarker} onViewportChange={viewportChange}>
				{/* Fixed pin */}
				{props.items.map((pin, i) => (
					<Marker
						key={i}
						position={[
							pin.lat,
							pin.lon
						]}
						onClick={() => {
							setManageLeaflet(manageLeaflet => ({
								...manageLeaflet,
								activePark: pin,
								center: [pin.lat, pin.lon]
							}));
							props.getItemIndex(pin.id)
						}}
					/>
				))

				}

				{/* Fixed pin pop up */}
				{
					manageLeaflet.activePark && (
						<Popup className="Popup"
							position={[
								manageLeaflet.activePark.lat,
								manageLeaflet.activePark.lon
							]}
							onClose={() => {
								setManageLeaflet(manageLeaflet => ({
									...manageLeaflet,
									activePark: null,
									modifyPopup: null
								}))
								props.getItemIndex(null);
							}}
						>
							{manageLeaflet.modifyPopup ?
								<div className="Popup-modify" >
									<div className="Popup-modify-header">
										<h2>Modifier: </h2>
										<p>{manageLeaflet.modifyName}</p>
									</div>
									<hr />
									<form className="Popup-temp-adding-form" onSubmit={handleModify}>
										<label htmlFor="modifyName">Nom de balise</label>
										<input type="text" name="modifyName" value={manageLeaflet.modifyName} onChange={handleChange} />
										<div className="Popup-temp-adding-form-geo">
											<h3>Géo : </h3>
											<p>{manageLeaflet.activePark.lat}, {manageLeaflet.activePark.lon}</p>
										</div>
										<label htmlFor="modifDescription">Description de la balise</label>
										<textarea name="modifyDescription" value={manageLeaflet.modifyDescription} rows={6} maxlength="255" onChange={handleChange} />
										<div className="Popup-modify-options">
											<button className="Popup-modify-options-button-delete" onClick={handleDelete}>SUPPRIMER</button>
											<input type="submit" value="MODIFIER" className="Popup-temp-adding-form-submit" />
										</div>
									</form>
								</div>
								:
								<div className="Popup-container">
									<div className="Popup-container-header">
										<h2>{manageLeaflet.activePark.name}</h2>
										<p>(id #{manageLeaflet.activePark.id}) :</p>
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
										<input type="submit" value="MODIFIER ?" onClick={modifyMarker} />
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
								setManageLeaflet(manageLeaflet => ({
									...manageLeaflet,
									new: null,
									savePopup: null
								}))
							}}
						>
							{manageLeaflet.savePopup ?
								<div className="Popup-temp-adding">
									<h2>Ajout balise: </h2>
									<hr />
									<form className="Popup-temp-adding-form" onSubmit={handleSubmit}>
										<label htmlFor="newName">Nom de balise</label>
										<input type="text" name="newName" id="name" placeholder="Nom de balise" onChange={handleChange} />
										<div className="Popup-temp-adding-form-geo">
											<h4>Géo : </h4>
											<p>{manageLeaflet.new[0]}, {manageLeaflet.new[1]}</p>
										</div>
										<label htmlFor="newDescription">Description de la balise</label>
										<textarea name="newDescription" id="description" placeholder="Description de la balise" rows={6} maxLength="255" onChange={handleChange} />
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

				{
					satellite ?
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
			</MapContainer >
			<button className="Button-map-style" onClick={() => setSatellite(!satellite)}>
				<LeafletMin satellite={!satellite} center={manageLeaflet.center} zoom={manageLeaflet.zoom} />
			</button>
		</>
	);
}

