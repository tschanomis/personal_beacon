
import React from "react";
import { Map, TileLayer } from "react-leaflet";

import './style/LeafletMin.css';

class Leaflet extends React.Component {

	state = {
		center: [48.854730, 2.346803],
		zoom: 14,
	}

	render() {
		return (
			<div className="LeafletMin">
				<div className="Leaflet-min-block"></div>
				<Map center={this.state.center} zoom={this.state.zoom} zoomControl={false}>
					{this.props.satelite ?
						<TileLayer
							url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
						//attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
						/>
						:
						<TileLayer
							url="http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png"
						//attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						/>
					}
				</Map >
			</div>
		);
	}
}

export default Leaflet

