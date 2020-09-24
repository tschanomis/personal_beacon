import React, { useEffect, useState } from 'react';
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

export default function Dashboard(props) {

	const [manageDashboard, setManageDashboard] = useState({
		isError: false,
		items: [],
		itemIndex: null,
		fromAddressBar: null,
		displayMobileInfo: false,
		activities: null,
	})

	useEffect(() => {
		RequestAPI("GET", "/places", {
			token: props.giveToken
		})
			.then(result => {
				if (result.status === 200) {
					const items = result.data
					setManageDashboard({ ...manageDashboard, items: items })
				} else {
					setManageDashboard({ ...manageDashboard, isError: true })
				}
			}).catch(e => {
				setManageDashboard({ ...manageDashboard, isError: true })
			});
	}, [props, manageDashboard])

	const displayReturn = () => {
		setManageDashboard({ ...manageDashboard, displayMobileInfo: false })
	}

	const addItem = (item) => {
		/*this.setState({
			items: [...this.state.items, item]
		})*/
		setManageDashboard({ ...manageDashboard, items: [...manageDashboard.items, item] })
		//this.componentDidMount()
	}

	const removeItem = (id) => {
		const refreshItems = manageDashboard.items.filter(item => item.id !== id)
		setManageDashboard({ ...manageDashboard, items: refreshItems })
	}

	const updateItem = (id) => {
		//this.componentDidMount()
	}

	const getItemIndex = (id) => {
		setManageDashboard({ ...manageDashboard, itemIndex: id })
	}

	const getAddress = (lat, lon) => {
		setManageDashboard({ ...manageDashboard, fromAddressBar: [lat, lon] })
	}

	const getTokenError = () => {
		setManageDashboard({ ...manageDashboard, isError: true })
	}

	if (manageDashboard.isError) {
		return <Redirect to="/" />;
	}

	return (
		<div className="Dashboard">
			<DashboardInfo items={manageDashboard.items} giveIndex={manageDashboard.itemIndex} displayMobileInfo={manageDashboard.displayMobileInfo} displayReturn={displayReturn} />
			<div className="Dashboard-right">
				<Router>
					<DashboardMenu getTokenError={getTokenError} />
					<Switch>
						<Route path="/dashboard/stats">
							<div className="Dashboard-right-stats-header">Total activations sur 7 jours :</div>
							<div className="Stats-container">
								<Stats giveToken={props.giveToken} /*getActivities={getActivities}*/ getTokenError={getTokenError} />
							</div>
						</Route>
						<Route path="/dashboard">
							<DashboardSearch getAddress={getAddress} />
							<DashboardMap
								items={manageDashboard.items}
								giveToken={props.giveToken}
								addItem={addItem}
								updateItem={updateItem}
								removeItem={removeItem}
								getItemIndex={getItemIndex}
								fromAddressBar={manageDashboard.fromAddressBar}
								displayReturn={displayReturn}
								alert={props.alert}
							/>
							{manageDashboard.displayMobileInfo ?
								''
								:
								<button className="Dashboard-display-info" onClick={() => setManageDashboard({ manageDashboard, displayMobileInfo: true })}>+</button>
							}
						</Route>
					</Switch>
				</Router>
			</div>
		</div >
	);
}