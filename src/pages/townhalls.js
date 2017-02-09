import React, { Component } from 'react';
import base from '../configs/firebase';
import AppBar from 'material-ui/AppBar';
import Townhall from '../components/townhall';
import './townhalls.css';

class Townhalls extends Component {
  	constructor(props) {
    	super(props);
    	this.state = {
      		townhalls: [],
    	};
  	}

	componentDidMount(){
	  base.bindToState(`townhalls`, {
	    context: this,
	    state: 'townhalls',
	    asArray:true
	  });
	}

  	render() {
	    return (
	    	<div className="townhalls-page">
	    		<AppBar title="Town Hall Live Questions" style={{background:'#333739'}} />
		      	<div className="townhalls">
		      		<div className="townhall">You can only access questions when a town hall is ongoing.</div>
		        	{this.state.townhalls.sort((a, b) => a.from > b.from).map((item, index) => {
	                	return <Townhall 
	                    	name={item.name}
	                    	date={item.date}
	                    	index={index}
	                    	key={item.key} />
	            	})}
		      	</div>
		    </div>
	    );
  	}
}

export default Townhalls;