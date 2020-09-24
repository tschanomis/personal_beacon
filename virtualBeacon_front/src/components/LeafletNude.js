
import React from "react";
import { Map, TileLayer } from "react-leaflet";

import './style/LeafletNude.css';

export default function LeafletNude() {

	const manageMap = ({
		center: [48.854730, 2.346803],
		zoom: 14
	})

	return (
		<div className="LeafletNude-container">
			<Map center={manageMap.center} zoom={manageMap.zoom} zoomControl={false}>
				<TileLayer
					url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				/>
			</Map>
		</div>
	);
}

