import React, { Component } from 'react';
import base from '../configs/firebase';
import Townhall from '../components/townhall';

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
	      <div className="townhalls">
	        {this.state.townhalls.sort((a, b) => a.from > b.from).map((item, index) => {
                return <Townhall 
                    name={item.name}
                    date={item.date}
                    key={item.key} />
            })}
	      </div>
	    );
  	}
}

export default Townhalls;