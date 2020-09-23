import React from 'react';

import './style/DashboardMenu.css';
import { Link } from 'react-router-dom';

class DashboardMenu extends React.Component {
	state = {
		selected: 1,
		hovering: null,
		displayAccount: false
	}

	handleClick = (e) => {
		e.preventDefault()
		const value = e.currentTarget.id
		this.setState({ selected: value })
	}

	render() {
		return (
			<div className="DashboardMenu">
				<div className="DashboardMenu-body">
					<div className="DashboardMenu-body-item" id="1" onClick={this.handleClick} >
						<Link to="/dashboard"><p style={{ borderBottom: this.state.selected === 1 ? '2px white solid' : 'none' }}>Dashboard</p></Link>
					</div>
					<div className="DashboardMenu-body-item" id="2" onClick={this.handleClick} >
						<p style={{ borderBottom: this.state.selected === 2 ? '2px white solid' : 'none' }}>Import</p>
					</div>
					<div className="DashboardMenu-body-item" id="3" onClick={this.handleClick} >
						<Link to="/dashboard/stats"><p style={{ borderBottom: this.state.selected === 3 ? '2px white solid' : 'none' }}>Statistiques</p></Link>
					</div>
				</div>
				<div className="DashboardMenu-account">
					<p>Username / email</p>
					<div className="DashboardMenu-account-picture"></div>
					<span className="DashboardMenu-account-arrow" onClick={() => this.setState({ displayAccount: !this.state.displayAccount })}>v</span>
				</div>
				{this.state.displayAccount ?
					< div className="DashboardMenu-account-options" >
						<Link>Compte</Link>
						<Link onClick={() => this.props.getTokenError()}>Déconnexion</Link>
					</div>
					:
					''
				}
			</div>
		);
	}
}

export default DashboardMenu;
