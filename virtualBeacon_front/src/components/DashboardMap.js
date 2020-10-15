import React from 'react';

import Leaflet from './Leaflet';

import './style/DashboardMap.css';

export default function DashboardMap(props) {
	return (
		<div className="DashboardMap">
			<Leaflet
				items={props.items}
				addItem={props.addItem}
				updateItem={props.updateItem}
				removeItem={props.removeItem}
				getItemIndex={props.getItemIndex}
				fromAddressBar={props.fromAddressBar}
				displayReturn={props.displayReturn}
				alert={props.alert}
			/>
		</div>
	);
}

