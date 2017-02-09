import React, { Component } from 'react';

class Townhall extends Component {

  	render() {
	    return (
		    <div>
		      	<div className="townhall">
		     		<p>{this.props.name}</p>
		     		<p>{this.props.date}</p>
		      	</div>
		    </div>
	    );
  	}
}

export default Townhall;