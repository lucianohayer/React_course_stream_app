import React, { Component } from 'react';
import { GOOGLE_OAUTH_ID } from '../properties/oauthId';

class GoogleAuth extends Component {
	state = { isSignedIn: null };
	auth = null;

	onSignIn = () => {
		this.auth.signIn();
	};

	onSignOut = () => {
		this.auth.signOut();
	};

	componentDidMount() {
		window.gapi.load('client:auth2', () => {
			window.gapi.client
				.init({
					clientId: GOOGLE_OAUTH_ID,
					scope: 'email',
				})
				.then(() => {
					this.auth = window.gapi.auth2.getAuthInstance();
					this.setState({
						isSignedIn: this.auth.isSignedIn.get(),
					});
					this.auth.isSignedIn.listen(() => this.onAuthChange());
				});
		});
	}

	onAuthChange() {
		this.setState({ isSignedIn: this.auth.isSignedIn.get() });
	}

	renderAuthButton() {
		if (this.state.isSignedIn === null) {
			return null;
		} else if (this.state.isSignedIn) {
			return (
				<button className="ui red google button" onClick={this.onSignOut}>
					<i className="google icon" />
					Sign out
				</button>
			);
		} else {
			return (
				<button className="ui red google button" onClick={this.onSignIn}>
					<i className="google icon" />
					Sign in with Google
				</button>
			);
		}
	}

	render() {
		return <div>{this.renderAuthButton()}</div>;
	}
}

export default GoogleAuth;
