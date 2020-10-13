import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import './style/DashboardMenu.css';

export default function DashboardMenu(props) {

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
				<NavLink to="/dashboard" className="inactive" style={{ borderBottom: manageDashboardMenu.selected === 1 ? '2px white solid' : 'none' }} id="1" onClick={handleClick}>
					Dashboard
				</NavLink>
				<NavLink to="/dashboard" className="inactive" style={{ borderBottom: manageDashboardMenu.selected === 2 ? '2px white solid' : 'none' }} id="2" onClick={handleClick} >
					Import
				</NavLink>
				<NavLink to="/dashboard/stats" className="inactive" style={{ borderBottom: manageDashboardMenu.selected === 3 ? '2px white solid' : 'none' }} id="3" onClick={handleClick}>
					Statistiques
				</NavLink>
			</div >
			<div className="DashboardMenu-account">
				<p>Username / email</p>
				<div className="DashboardMenu-account-picture"></div>
				<span className="DashboardMenu-account-arrow" style={{ transform: manageDashboardMenu.displayAccount ? 'rotate(180deg)' : '' }} onClick={() => setManageDashboardMenu({ ...manageDashboardMenu, displayAccount: !manageDashboardMenu.displayAccount })}>v</span>
			</div>
			{
				manageDashboardMenu.displayAccount ?
					< div className="DashboardMenu-account-options" style={{ animation: 'linear 0.1s slidein forwards' }}>
						<Link to="Dashboard/">Compte</Link>
						<Link to="Dashboard/" onClick={() => props.getTokenError()}>Déconnexion</Link>
					</div>
					:
					null
			}
		</div >
	)
}
