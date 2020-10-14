import React, { useState } from 'react';
import { useCookies } from "react-cookie";
import {
	Link,
	Redirect,
} from 'react-router-dom';

import RequestAPI from "../Utils/API";

import './style/CardForm.css';

export default function CardForm(props) {

	const [cookies, setCookie] = useCookies()
	const [manageLogin, setManageLogin] = useState({
		isLoggedIn: false,
		isError: false,
		email: null,
		password: null,
		forgot: false,
	})

	const handleChange = (e) => {
		const value = e.target.value
		setManageLogin({ ...manageLogin, [e.target.name]: value })
	}

	const handleSubmit = (e) => {
		RequestAPI("POST", "/login", {
			email: manageLogin.email,
			password: manageLogin.password
		}).then(result => {
			if (result.status === 200) {
				setCookie("userTokenBeacon", result.data.success.token, {
					path: "/",
					maxAge: 86400
				});
				setCookie("email", manageLogin.email, {
					path: "/",
					maxAge: 86400
				});
				setManageLogin({ ...manageLogin, isLoggedIn: true })
				props.alert(result.data.message)
			} else {
				setManageLogin({ ...manageLogin, isError: true })
				props.alert(result.data.error)
			}
		}).catch(e => {
			setManageLogin({ ...manageLogin, isError: true })
			props.alert("Erreur connexion")
		});
		e.preventDefault()
	}

	const handleForgot = (e) => {
		RequestAPI("POST", "/password/email", {
			email: manageLogin.email
		}).then(result => {
			if (result.status === 200) {
				props.alert("Email envoyé")
				setManageLogin({ ...manageLogin, forgot: false })
			} else {
				props.alert(result.headers)
			}
		}).catch(e => {
			props.alert("Erreur")
		});
		e.preventDefault()
	}

	return (
		<div className="CardForm" >
			{cookies["userTokenBeacon"] && <Redirect to="/dashboard" />}
			{manageLogin.forgot ?
				<div className="CardForm-Container" style={{ justifyContent: 'center' }}>
					<h3>Réinitialisation mot de passe:</h3>
					<form className="CardForm-Login" onSubmit={handleForgot}>
						<label htmlFor="email">adresse email</label>
						<input type="email" name="email" id="email" placeholder="adresse email" onChange={handleChange} />
						<input type="submit" value="REINITIALISER" className="Cardform-submit" style={{ border: 'none' }} />
					</form>
					<Link to="" onClick={() => setManageLogin({ ...manageLogin, forgot: false })}>Retour</Link>
				</div>
				:
				<div className="CardForm-Container">
					<h1>Login</h1>
					<p>Pas inscrit? <Link to="">Inscrivez vous</Link></p>
					<form className="CardForm-Login" onSubmit={handleSubmit}>
						<label htmlFor="email">adresse email</label>
						<input type="email" name="email" id="email" placeholder="adresse email" onChange={handleChange} />
						<label htmlFor="password">mot de passe</label>
						<input type="password" name="password" id="password" placeholder="mot de passe" onChange={handleChange} />
						<div className="CardForm-Login-options">
							<div className="CardForm-Login-options-container-remember">
								<input name="remember" id="remember" type="checkbox" />
								<label className="remember-label" htmlFor="remember">Se souvenir de moi</label>
							</div>
							<Link to="" onClick={() => { setManageLogin({ ...manageLogin, forgot: true }) }}>Mot de passe oublié ?</Link>
						</div>
						<input type="submit" value="CONNEXION" className="Cardform-submit" />
					</form>
					<div>
						<a target="_blank" href="https://google.com/" rel="noopener noreferrer">google.com</a>
					</div>
				</div>}
			<div className="CardForm-Visu">
				<div className="CardForm-Visu-Container">
					<div className="CardForm-Visu-Logo"></div>
					<div className="CardForm-Visu-Text">
						<h1>Lorem ipsum</h1>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at dictum nisi. Nullam blandit ultrices ex, non pharetra urna dictum eu.</p>
					</div>
				</div>
			</div>
		</div>
	);
}
