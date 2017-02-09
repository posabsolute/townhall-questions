import React, { Component } from 'react';
import Paper from 'material-ui/Paper';



class Townhall extends Component {

    render() {
      return (
          <div className="question">
            <Paper>
              <p>{this.props.name}</p>
              <p>{this.props.description}</p>
              <p>{this.props.votes}</p>
            </Paper>
          </div>
      );
    }
}

export default Townhall;
