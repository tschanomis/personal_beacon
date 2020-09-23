
import React from "react";
import { Map, TileLayer } from "react-leaflet";

import './style/LeafletNude.css';

class LeafletNude extends React.Component {

	state = {
		center: [48.854730, 2.346803],
		zoom: 14,
	}

	render() {
		return (
			<div className="LeafletNude-container">
				<Map center={this.state.center} zoom={this.state.zoom} zoomControl={false}>
					<TileLayer
						url="http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png"
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					/>
				</Map>
			</div>
		);
	}
}

export default LeafletNude

