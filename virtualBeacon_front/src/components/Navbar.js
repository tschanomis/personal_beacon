import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useRouteMatch
} from 'react-router-dom';
import './style/Navbar.css';

function Navbar() {
	return (
		<div className="Navbar">
			<h1><Link to="/">Velib</Link></h1>
			<ul>
				<li><Link to="/liste">Liste</Link></li>
				<li><Link to="/recherche">Recherche</Link></li>
				<li><Link to="/ajouter">Ajouter</Link></li>
				<li><Link to="/supprimer">supprimer</Link></li>
			</ul>
		</div>
	);
}

export default Navbar;
