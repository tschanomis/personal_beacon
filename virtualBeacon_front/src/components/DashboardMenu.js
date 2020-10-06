import React, { useState } from 'react';

import './style/DashboardMenu.css';
import { Link } from 'react-router-dom';

export default function DashboardMenu(props) {

	const [manageDashboardMenu, setManageDashboardMenu] = useState({
		selected: 1,
		hovering: null,
		displayAccount: false
	})

	const handleClick = (e) => {
		setManageDashboardMenu({ ...manageDashboardMenu, selected: e.currentTarget.id })
	}

	return (
		<div className="DashboardMenu">
			<div className="DashboardMenu-body">
				<div className="DashboardMenu-body-item" id="1" onClick={handleClick} >
					<Link to="/dashboard"><p style={{ borderBottom: manageDashboardMenu.selected === 1 ? '2px white solid' : 'none' }}>Dashboard</p></Link>
				</div>
				<div className="DashboardMenu-body-item" id="2" onClick={handleClick} >
					<p style={{ borderBottom: manageDashboardMenu.selected === 2 ? '2px white solid' : 'none' }}>Import</p>
				</div>
				<div className="DashboardMenu-body-item" id="3" onClick={handleClick} >
					<Link to="/dashboard/stats"><p style={{ borderBottom: manageDashboardMenu.selected === 3 ? '2px white solid' : 'none' }}>Statistiques</p></Link>
				</div>
			</div>
			<div className="DashboardMenu-account">
				<p>Username / email</p>
				<div className="DashboardMenu-account-picture"></div>
				<span className="DashboardMenu-account-arrow" onClick={() => setManageDashboardMenu({ displayAccount: !manageDashboardMenu.displayAccount })}>v</span>
			</div>
			{manageDashboardMenu.displayAccount ?
				< div className="DashboardMenu-account-options" >
					<Link>Compte</Link>
					<Link onClick={() => props.getTokenError()}>Déconnexion</Link>
				</div>
				:
				''
			}
		</div>
	)
}
