import React, { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import { Navigate, Outlet } from 'react-router-dom';

import RequestAPI from "../Utils/API";

import './style/Dashboard.css';

import DashboardMenu from '../components/DashboardMenu';
import DashboardInfo from '../components/DashboardInfo';

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
			{manageDashboard.isError && <Navigate to="/" />}
			<DashboardInfo
				items={manageDashboard.items}
				giveIndex={manageDashboard.itemIndex}
				displayMobileInfo={manageDashboard.displayMobileInfo}
				displayReturn={displayReturn}
			/>

			<div className="Dashboard-right">
				<DashboardMenu />
				<Outlet />
			</div>

			{/* <div className="Dashboard-right">
				<Routes>
					<Route path="/dashboard/stats" element={() =>
						<div className="Dashboard-right-stats">
							<div className="Dashboard-right-stats-header">Total activations sur 7 jours :</div>
							<div className="Dashboard-right-stats-container">
								<Stats />
							</div>
						</div>
					} />

					<Route path="/" element={() =>
						<>
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
						</>
					}>
					</Route>
				</Routes>
			</div> */}
		</div >
	);
}