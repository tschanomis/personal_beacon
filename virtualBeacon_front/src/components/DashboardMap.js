import React, { useState } from 'react';

import Leaflet from './Leaflet';
import LeafletMin from './LeafletMin';

import './style/DashboardMap.css';

export default function DashboardMap(props) {

	const [satellite, setSatellite] = useState(false)

	return (
		<div className="DashboardMap">
			<Leaflet
				items={props.items}
				giveToken={props.giveToken}
				addItem={props.addItem}
				updateItem={props.update}
				removeItem={props.removeItem}
				getItemIndex={props.getItemIndex}
				fromAddressBar={props.fromAddressBar}
				displayReturn={props.displayReturn}
				alert={props.alert}
				satelite={satellite}
			/>
			<button className="Button-map-style" onClick={() => setSatellite(!satellite)}>
				<LeafletMin satelite={!satellite} />
			</button>
		</div>
	);
}

