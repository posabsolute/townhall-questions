import React, { Component } from 'react';

class Townhall extends Component {

  	render() {
	    return (
	      	<div className="townhall">
	     		<p>{this.props.name}</p>
	     		<p>{this.props.date}</p>
	      	</div>
	    );
  	}
}

export default Townhall;