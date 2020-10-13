
import React from "react";
import { Map, TileLayer } from "react-leaflet";

import './style/LeafletMin.css';

export default function Leaflet(props) {
	return (
		<div className="LeafletMin">
			<div className="Leaflet-min-block">	<p>{props.satellite ? 'satellite' : 'carte'}</p></div>
			<Map center={props.center} zoom={props.zoom} zoomControl={false}>
				{props.satellite ?
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
