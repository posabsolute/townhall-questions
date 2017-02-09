import React, { Component } from 'react';
import base from '../configs/firebase';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

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
  		this.context.router.push('/townhalls');
  	}else{
  		this.setSnackMessage('Please use your AppDirect account.');
  	}
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
      <div className="Login">
      	<Snackbar
      	  bodyStyle={{background:'red'}}
          open={this.state.alertOpen}
          message={this.state.alertMessage}
          autoHideDuration={4000}
        />
        <RaisedButton label="Login" primary={true} onClick={this.login.bind(this)} />
      </div>
    );
  }
}

Login.contextTypes = {
  router: React.PropTypes.object
};

export default Login;