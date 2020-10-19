import React, { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
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

	const [cookies, setCookie, removeCookie] = useCookies()
	const [manageDashboard, setManageDashboard] = useState({
		isError: false,
		items: [],
		itemIndex: null,
		fromAddressBar: null,
		displayMobileInfo: false,
		activities: null,
	})

	const displayReturn = () => {
		setManageDashboard({ ...manageDashboard, displayMobileInfo: false })
	}

	const addItem = (newItem) => {
		setManageDashboard({ ...manageDashboard, items: [...manageDashboard.items, newItem] })
	}

	const removeItem = (id) => {
		const refreshItems = manageDashboard.items.filter(item => item.id !== id)
		setManageDashboard({ ...manageDashboard, items: refreshItems, itemIndex: null })
	}

	const updateItem = (item) => {
		const refreshItems = manageDashboard.items.map(elt => {
			if (elt.id === item.id) {
				return { ...elt, name: item.name, description: item.description }
			} else {
				return elt
			}
		})
		setManageDashboard({ ...manageDashboard, items: refreshItems, itemIndex: null })
	}

	const getItemIndex = (id) => {
		setManageDashboard({ ...manageDashboard, itemIndex: id })
	}

	const getAddress = (lat, lon) => {
		setManageDashboard({ ...manageDashboard, fromAddressBar: [lat, lon] })
	}

	useEffect(() => {
		RequestAPI("GET", "/places", {
			token: cookies["userTokenBeacon"]
		}).then(result => {
			if (result.status === 200) {
				setManageDashboard(manageDashboard => ({ ...manageDashboard, items: result.data }))
			} else {
				setManageDashboard(manageDashboard => ({ ...manageDashboard, isError: true }))
				removeCookie()
			}
		}).catch(e => {
			setManageDashboard(manageDashboard => ({ ...manageDashboard, isError: true }))
			removeCookie()
		})
	}, [cookies, setCookie, removeCookie])

	return (
		<div className="Dashboard">
			{manageDashboard.isError && <Redirect to="/" />}
			<DashboardInfo
				items={manageDashboard.items}
				giveIndex={manageDashboard.itemIndex}
				displayMobileInfo={manageDashboard.displayMobileInfo}
				displayReturn={displayReturn}
			/>
			<div className="Dashboard-right">
				<Router>
					<DashboardMenu />
					<Switch>
						<Route path="/dashboard/stats">
							<div className="Dashboard-right-stats">
								<div className="Dashboard-right-stats-header">Total activations sur 7 jours :</div>
								<div className="Dashboard-right-stats-container">
									<Stats />
								</div>
							</div>
						</Route>
						<Route path="/">
							<DashboardSearch getAddress={getAddress} />
							<DashboardMap
								items={manageDashboard.items}
								addItem={addItem}
								updateItem={updateItem}
								removeItem={removeItem}
								getItemIndex={getItemIndex}
								displayReturn={displayReturn}
								fromAddressBar={manageDashboard.fromAddressBar}
								alert={props.alert}
							/>
							{manageDashboard.displayMobileInfo ?
								null
								:
								<button className="Dashboard-display-info" onClick={() => setManageDashboard({ ...manageDashboard, displayMobileInfo: true })}>+</button>
							}
						</Route>
					</Switch>
				</Router>
			</div>
		</div >
	);
}