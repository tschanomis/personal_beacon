import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import './style/DashboardMenu.css';

export default function DashboardMenu() {

	const test = useHistory()
	const [cookies, setCookie, removeCookie] = useCookies()
	const [manageDashboardMenu, setManageDashboardMenu] = useState({
		selected: 1,
		hovering: null,
		displayAccount: false
	})

	const handleClick = (e) => {
		setManageDashboardMenu({ ...manageDashboardMenu, selected: Number(e.currentTarget.id) })
	}

	return (
		<div className="DashboardMenu">
			<div className="DashboardMenu-body">
				<Link to="/dashboard"
					className="inactive"
					style={{ borderBottom: test.location.pathname === "/dashboard" ? '2px white solid' : 'none' }}
					id="1"
					onClick={handleClick}
				>
					Dashboard
				</Link>
				<Link to="/dashboard/import"
					className="inactive"
					style={{ borderBottom: test.location.pathname === "/dashboard/import" ? '2px white solid' : 'none' }}
					id="2"
					onClick={handleClick}
				>
					Import
				</Link>
				<Link to="/dashboard/stats"
					className="inactive"
					style={{ borderBottom: test.location.pathname === "/dashboard/stats" ? '2px white solid' : 'none' }}
					id="3"
					onClick={handleClick}
				>
					Statistiques
				</Link>
			</div >
			<div className="DashboardMenu-account">
				<p>{cookies['userEmailBeacon']}</p>
				<div className="DashboardMenu-account-picture"></div>
				<span className="DashboardMenu-account-arrow" style={{ transform: manageDashboardMenu.displayAccount ? 'rotate(180deg)' : '' }} onClick={() => setManageDashboardMenu({ ...manageDashboardMenu, displayAccount: !manageDashboardMenu.displayAccount })}>v</span>
			</div>
			{
				manageDashboardMenu.displayAccount
					?
					< div className="DashboardMenu-account-options" style={{ animation: 'linear 0.1s slidein forwards' }}>
						<Link to="Dashboard/">Compte</Link>
						<Link to="/" onClick={() => {
							removeCookie('userTokenBeacon', { path: '/' })
							setCookie('userEmailBeacon', null)
						}}>
							Déconnexion
						</Link>
					</div>
					:
					null
			}
		</div >
	)
}
