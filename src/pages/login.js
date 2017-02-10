import React, { Component } from 'react';
import base from '../configs/firebase';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertOpen: false,
      alertMessage: ''
    };
  }

  login() {
  	base.authWithOAuthPopup('google', this.authHandler.bind(this));
  }

  authHandler(error, auth)  {
  	if(error) {
  		this.setSnackMessage(error.message);
  		return;
  	}
  	if(this.isAppdirectUser(auth.user.email)) {
  		this.saveUser(auth.user);
  		this.context.router.push('/townhalls');
  	}else{
  		this.setSnackMessage('Please use your AppDirect account.');
  	}
  }

  saveUser(user) {
  	base.post(`users/${user.uid}`, {
    	data: {
	    	displayName: user.displayName, 
	    	email: user.email,
	    	photo: user.photoURL,
	    	uid: user.uid
	    }
    });
  }

  setSnackMessage(message) {
  	this.setState({
		alertOpen: true,
		alertMessage: message
	});
  }

  isAppdirectUser(email) {
  	return /@appdirect\.com/.test(email);
  }

  render() {
    return (
  		<div>
	      <div className="loginBg"></div>
	      <div className="login">
	      	<Snackbar
	      	  bodyStyle={{background:'red'}}
	          open={this.state.alertOpen}
	          message={this.state.alertMessage}
	          autoHideDuration={4000}
	        />
	      	<div className='login-account'>
	      		<img src='/logo.png' width="139px" height="144px" />
				<p>Town Hall Live Questions</p>
	      	</div>
	        <RaisedButton className='login-button' label="Login with Gmail" onClick={this.login.bind(this)} />
	      </div>
        </div>
    );
  }
}

Login.contextTypes = {
  router: React.PropTypes.object
};

export default Login;