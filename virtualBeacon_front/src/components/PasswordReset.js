import React from 'react';
import { Redirect } from 'react-router-dom';

import axios from 'axios';

import './style/CardForm.css';

class PasswordReset extends React.Component {
	state = {
		email: null,
		password: null,
		password_confirmation: null,
		token: null,
		validReset: false,
	}

	handleChange = (e) => {
		const value = e.target.value
		this.setState({ ...this.state, [e.target.name]: value })
	}

	handleSubmit = (e) => {
		if (this.state.password === this.state.password_confirmation) {
			axios.post("http://ec2-18-218-63-27.us-east-2.compute.amazonaws.com:443/api/password/reset", {
				email: this.state.email,
				password: this.state.password,
				password_confirmation: this.state.password_confirmation,
				token: this.state.token,
			}).then(result => {
				if (result.status === 200) {
					this.props.alert("Réinitialisé")
					this.setState({ validReset: true })
				} else {
					this.props.alert("Erreur")
				}
			}).catch(e => {
				this.props.alert("Erreur")
			});
			e.preventDefault()
		} else {
			this.props.alert("Erreur mot de passe")
		}
	}

	componentDidMount = () => {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const token = urlParams.get('token');
		this.setState({ token: token });
	}

	render() {
		if (this.state.validReset) {
			return <Redirect to="/" />
		}
		return (
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div className="CardForm-Container">
					<h3>Réinitialisation mot de passe</h3>
					<form className="CardForm-Login" onSubmit={this.handleSubmit}>
						<label for="email">adresse email</label>
						<input type="email" name="email" id="email" placeholder="adresse email" onChange={this.handleChange} required />
						<label for="password">mot de passe</label>
						<input type="password" name="password" id="password" placeholder="mot de passe" onChange={this.handleChange} required />
						<label for="password_c">confirmation mot de passe</label>
						<input type="password" name="password_confirmation" id="password_confirmation" placeholder=" confirmation mot de passe" onChange={this.handleChange} required />
						<input type="submit" value="REINITIALISATION" className="Cardform-submit" />
					</form>
				</div>
			</div>
		);
	}
}

export default PasswordReset;
