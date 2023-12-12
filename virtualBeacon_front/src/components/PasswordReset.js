import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import RequestAPI from "../Utils/API";

import './style/CardForm.css';

export default function PasswordReset(props) {

	const [managePasswordReset, setManagePasswordReset] = useState({
		email: null,
		password: null,
		password_confirmation: null,
		token: 'null',
		validReset: false,
	})

	const handleChange = (e) => {
		const value = e.target.value
		setManagePasswordReset({ ...managePasswordReset, [e.target.name]: value })
	}

	const handleSubmit = (e) => {
		if (managePasswordReset.password === managePasswordReset.password_confirmation) {
			RequestAPI("POST", "/password/reset", {
				email: managePasswordReset.email,
				password: managePasswordReset.password,
				password_confirmation: managePasswordReset.password_confirmation,
				token: managePasswordReset.token,
			}).then(result => {
				if (result.status === 200) {
					props.alert("Réinitialisé")
					setManagePasswordReset({ ...managePasswordReset, validReset: true })
				} else {
					props.alert("Erreur")
				}
			}).catch(e => {
				props.alert("Erreur")
			});
			e.preventDefault()
		} else {
			props.alert("Erreur mot de passe")
		}
	}

	useEffect(() => {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const token = urlParams.get('token');
		setManagePasswordReset({ ...managePasswordReset, token: token });
	}, [managePasswordReset])

	if (managePasswordReset.validReset) {
		return <Navigate to="/" />
	}
	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<div className="CardForm-Container">
				<h3>Réinitialisation mot de passe</h3>
				<form className="CardForm-Login" onSubmit={handleSubmit}>
					<label htmlFor="email">adresse email</label>
					<input type="email" name="email" id="email" placeholder="adresse email" onChange={handleChange} required />
					<label htmlFor="password">mot de passe</label>
					<input type="password" name="password" id="password" placeholder="mot de passe" onChange={handleChange} required />
					<label htmlFor="password_c">confirmation mot de passe</label>
					<input type="password" name="password_confirmation" id="password_confirmation" placeholder=" confirmation mot de passe" onChange={handleChange} required />
					<input type="submit" value="REINITIALISATION" className="Cardform-submit" />
				</form>
			</div>
		</div>
	);
}

