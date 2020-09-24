import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from 'react-router-dom';

import RequestAPI from "../Utils/API";

import './style/Dashboard.css';

import DashboardMenu from '../components/DashboardMenu';
import DashboardSearch from '../components/DashboardSearch';
import DashboardMap from '../components/DashboardMap';
import DashboardInfo from '../components/DashboardInfo';
import Stats from '../components/Stats';

class Dashboard extends React.Component {

	state = {
		isError: false,
		items: [],
		itemIndex: null,
		fromAddressBar: null,
		displayMobileInfo: false,
		activities: null,
	}

	displayReturn = () => {
		this.setState({ displayMobileInfo: false })
	}

	componentDidMount = () => {
		RequestAPI("GET", "/places", {
			token: this.props.giveToken
		}
		)
			.then(result => {
				if (result.status === 200) {
					const items = result.data
					this.setState({ items: items })
				} else {
					this.setState({ isError: true })
				}
			}).catch(e => {
				this.setState({ isError: true })
			});
	}

	addItem = (item) => {
		/*this.setState({
			items: [...this.state.items, item]
		})*/
		this.componentDidMount()
	}

	removeItem = (id) => {
		/*const idElement = id
		const refreshItems = this.state.items.filter(item => item.id !== idElement)
		this.setState({ items: refreshItems })
		console.log(id)*/
		this.componentDidMount()
	}

	updateItem = (id) => {
		this.componentDidMount()
	}

	getItemIndex = (id) => {
		this.setState({ itemIndex: id })
	}

	getAddress = (lat, lon) => {
		console.log(lat, lon)
		this.setState({ fromAddressBar: [lat, lon] })
	}

	getTokenError = () => {
		this.setState({ isError: true })
	}

	render() {
		if (this.state.isError) {
			return <Redirect to="/" />;
		}

		return (
			<div className="Dashboard">
				<DashboardInfo items={this.state.items} giveIndex={this.state.itemIndex} displayMobileInfo={this.state.displayMobileInfo} displayReturn={this.displayReturn} />
				<div className="Dashboard-right">
					<Router>
						<DashboardMenu getTokenError={this.getTokenError} />
						<Switch>
							<Route path="/dashboard/stats">
								<div className="Dashboard-right-stats-header">Total activations sur 7 jours :</div>
								<div className="Stats-container">
									<Stats giveToken={this.props.giveToken} getActivities={this.getActivities} getTokenError={this.getTokenError} />
								</div>
							</Route>
							<Route path="/dashboard">
								<DashboardSearch getAddress={this.getAddress} />
								<DashboardMap
									items={this.state.items}
									giveToken={this.props.giveToken}
									addItem={this.addItem}
									updateItem={this.updateItem}
									removeItem={this.removeItem}
									getItemIndex={this.getItemIndex}
									fromAddressBar={this.state.fromAddressBar}
									displayReturn={this.displayReturn}
									alert={this.props.alert}
								/>
								{this.state.displayMobileInfo ?
									''
									:
									<button className="Dashboard-display-info" onClick={() => this.setState({ displayMobileInfo: true })}>+</button>
								}
							</Route>
						</Switch>
					</Router>
				</div>
			</div >
		);
	}
}

export default Dashboard;
