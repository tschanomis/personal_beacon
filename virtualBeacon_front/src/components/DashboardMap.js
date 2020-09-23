import React from 'react';

import Leaflet from './Leaflet';
import LeafletMin from './LeafletMin';

import './style/DashboardMap.css';
class DashboardMap extends React.Component {
	state = {
		satelite: false
	}
	render() {
		return (
			<div className="DashboardMap">
				<Leaflet
					items={this.props.items}
					giveToken={this.props.giveToken}
					addItem={this.props.addItem}
					updateItem={this.props.updateItem}
					removeItem={this.props.removeItem}
					getItemIndex={this.props.getItemIndex}
					fromAddressBar={this.props.fromAddressBar}
					displayReturn={this.props.displayReturn}
					alert={this.props.alert}
					satelite={this.state.satelite}
				/>
				<button
					className="Button-map-style"
					onClick={() => this.setState({ satelite: !this.state.satelite })}
				>
					<LeafletMin satelite={!this.state.satelite} />
					{this.state.satelite ? 'plan' : 'satellite'}
				</button>
			</div>
		);
	}
}

export default DashboardMap;
