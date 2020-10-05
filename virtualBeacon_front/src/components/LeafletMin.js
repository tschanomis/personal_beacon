
import React, { useState } from "react";
import { Map, TileLayer } from "react-leaflet";

import './style/LeafletMin.css';

export default function Leaflet(props) {

	const [manageLeafletMin, setManageLeafletMin] = useState({
		center: [48.854730, 2.346803],
		zoom: 14
	})

	return (
		<div className="LeafletMin">
			<div className="Leaflet-min-block"></div>
			<Map center={manageLeafletMin.center} zoom={manageLeafletMin.zoom} zoomControl={false}>
				{props.satelite ?
					<TileLayer
						url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
					//attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
					/>
					:
					<TileLayer
						url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
					//attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					/>
				}
			</Map >
		</div>
	);
}
