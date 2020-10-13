import React, { useState } from 'react';

import Leaflet from './Leaflet';
import LeafletMin from './LeafletMin';

import './style/DashboardMap.css';

export default function DashboardMap(props) {

	const [satellite, setSatellite] = useState(false)
	const [manageMap, setManageMap] = useState({
		center: [48.854730, 2.346803],
		zoom: 14
	})

	const setCenterLeafletMiniature = (center, zoom) => {
		setManageMap(manageMap => ({ ...manageMap, center: center, zoom: zoom }))
	}

	return (
		<div className="DashboardMap">
			<Leaflet
				items={props.items}
				giveToken={props.giveToken}
				addItem={props.addItem}
				updateItem={props.updateItem}
				removeItem={props.removeItem}
				getItemIndex={props.getItemIndex}
				fromAddressBar={props.fromAddressBar}
				displayReturn={props.displayReturn}
				alert={props.alert}
				satellite={satellite}
				getCenterLeafletMiniature={setCenterLeafletMiniature}
			/>
			<button className="Button-map-style" onClick={() => setSatellite(!satellite)}>
				<LeafletMin satellite={!satellite} manageMap={manageMap} />
			</button>
		</div>
	);
}

