import React from 'react';
import {
	Link,
	Redirect,
} from 'react-router-dom';

import axios from 'axios';

import './style/CardForm.css';

class CardForm extends React.Component {
	state = {
		isLoggedIn: false,
		isError: false,
		email: null,
		password: null,
		test: 14,
		forgot: false,
	}

	handleChange = (e) => {
		const value = e.target.value
		this.setState({ ...this.state, [e.target.name]: value })
	}

	handleSubmit = (e) => {
		axios.post("http://ec2-18-218-63-27.us-east-2.compute.amazonaws.com:443/api/login", {
			email: this.state.email,
			password: this.state.password
		}).then(result => {
			if (result.status === 200) {
				this.props.getToken(result.data.success.token)
				this.setState({ isLoggedIn: true })
				this.props.alert(result.data.message)
			} else {
				this.setState({ isError: true })
				this.props.alert(result.data.error)
			}
		}).catch(e => {
			this.setState({ isError: true })
			this.props.alert("Erreur connexion")
		});
		e.preventDefault()
	}

	handleForgot = (e) => {
		axios.post("http://ec2-18-218-63-27.us-east-2.compute.amazonaws.com:443/api/password/email", {
			email: this.state.email,
		}).then(result => {
			if (result.status === 200) {
				this.props.alert("Email envoyé")
				this.setState({ forgot: false })
			} else {
				this.props.alert(result.headers)
			}
		}).catch(e => {
			this.props.alert("erreur")
		});
		e.preventDefault()
	}

	render() {
		if (this.state.isLoggedIn) {
			return <Redirect to="/dashboard" />;
		}

		return (
			<div className="CardForm" >
				{this.state.forgot ?
					<div className="CardForm-Container" style={{ justifyContent: 'center' }}>
						<h3>Réinitialisation mot de passe:</h3>
						<form className="CardForm-Login" onSubmit={this.handleForgot}>
							<label for="email">adresse email</label>
							<input type="email" name="email" id="email" placeholder="adresse email" onChange={this.handleChange} />
							<input type="submit" value="REINITIALISER" className="Cardform-submit" style={{ border: 'none' }} />
						</form>
						<Link onClick={() => this.setState({ forgot: false })}>Retour</Link>
					</div>
					:
					<div className="CardForm-Container">
						<h1>Login</h1>
						<p>Pas inscrit? <Link>Inscrivez vous</Link></p>
						<form className="CardForm-Login" onSubmit={this.handleSubmit}>
							<label for="email">adresse email</label>
							<input type="email" name="email" id="email" placeholder="adresse email" onChange={this.handleChange} />
							<label for="password">mot de passe</label>
							<input type="password" name="password" id="password" placeholder="mot de passe" onChange={this.handleChange} />
							<div className="CardForm-Login-options">
								<div className="CardForm-Login-options-container-remember">
									<input
										name="remember"
										id="remember"
										type="checkbox"
									/>
									<label className="remember-label" for="remember">Se souvenir de moi</label>
								</div>
								<Link onClick={() => { this.setState({ forgot: true }) }}>Mot de passe oublié ?</Link>
							</div>
							<input type="submit" value="CONNEXION" className="Cardform-submit" />
						</form>
						<div>
							<a target="_blank" href="https://n-vibe.com/" rel="noopener noreferrer">n-vibe.com</a>
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
}

export default CardForm;
