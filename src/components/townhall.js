import React, { Component } from 'react';

class Townhall extends Component {

  	render() {
	    return (
		    <div>
		      	<div className="townhall">
		      		<div className='townhall-img' style={{ 'background-image':`url('/image-${this.props.index}.jpg')` }}></div>
		     		<h3>{this.props.name}</h3>
		     		<h4>{this.props.date}</h4>
		      	</div>
		    </div>
	    );
  	}
}

export default Townhall;