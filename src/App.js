import React, { Component } from 'react';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import base from './configs/firebase';

injectTapEventPlugin();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user: {},
        townhalls: [],
        currentTownhall: {}
    };
  }
  componentDidMount() {
    base.onAuth(this.listenToUser.bind(this));
  }

  listenToUser(user) {
    if(user){
      this.setState({user: user});
      this.listenToTownhalls();
    }
  }

  listenToTownhalls() {
    base.listenTo(`townhalls`, {
        context: this,
        asArray: true,
        then(townhalls){
          this.verifyCurrentTownhall(townhalls);
        }
      })
  }

  verifyCurrentTownhall(townhalls) {
    var currentTime = new Date().getTime();
    var currentTownhall = townhalls.filter((townhall) => {
      if(currentTime > townhall.start && currentTime < townhall.end) {
        return true;
      }
      return false;
    });
    if(currentTownhall.length) {
      var route = this.context.router.location.pathname;
      this.setState({
        currentTownhall : currentTownhall[0]
      });
      if(route !== '/questions') {
        //this.context.router.push('/questions');
      }
    } else {
      window.setTimeout(() => this.verifyCurrentTownhall(townhalls), 20000);
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          {React.cloneElement(this.props.children, { user: this.state.user, currentTownhall: this.state.currentTownhall })}
        </div>
      </MuiThemeProvider>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.object
};

export default App;
