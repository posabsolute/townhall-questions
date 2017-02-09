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
    console.log('crap');
    base.bindToState(`townhalls`, {
      context: this,
      state: 'townhalls',
      asArray:true
    });

  }

  componentWillUpdate(nextProps, nextState) {
     console.log('crap');
    console.log(nextState)
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

export default App;
