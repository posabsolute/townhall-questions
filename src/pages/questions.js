import React, { Component } from 'react';
import base from '../configs/firebase';
import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Question from '../components/question';
import ModalAddQuestion from '../components/add-question-dialog';
import FlipMove from 'react-flip-move';

import './questions.css';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      openModal:false,
    };
  }

  componentDidMount() {
    base.bindToState(`questions`, {
      context: this,
      state: 'questions',
      asArray: true
    });
  }

  saveQuestion() {
  	var uuid = generateGuid();
	if (this.state.question) {
	  	base.post(`questions/${uuid}`, {
	    	data: {
		    	name: this.state.question, 
		    	description: this.state.description,
		    	user: this.props.user.uid,
		    	uuid: uuid,
		    	votes: 0,
		    	townhall: this.props.currentTownhall.key,
		    	key: uuid,
		    }
	    });
	    this.handleClose();	
	}

  	function generateGuid() {
	  var result, i, j;
	  result = '';
	  for(j=0; j<32; j++) {
	    if( j == 8 || j == 12|| j == 16|| j == 20) 
	      result = result + '-';
	    i = Math.floor(Math.random()*16).toString(16).toUpperCase();
	    result = result + i;
	  }
	  return result;
  	}
  }

  openAddQuestionModal() {
  	console.log('crap');
  	this.setState({openModal:true});
  }

  render() {
  	var questions = this.state.questions.filter(question => parseInt(question.townhall, 10) === parseInt(this.props.currentTownhall.key, 10));
    return (
      <div className="questions-page">
        <AppBar title="Town Hall Live Questions" style={{background:'#333739'}} />
        <div className='questions'>
          <FlipMove easing="cubic-bezier(0, 0.7, 0.8, 0.1)">
          {questions.sort((a, b) => a.votes < b.votes).map((item, index) => {
            return <Question
              name={item.name}
              description={item.description}
              votes={item.votes}
              uuid={item.uuid}
              key={item.key} />
          })}
          </FlipMove>
        </div>
        <div className="button">
        	<FloatingActionButton backgroundColor='#333739'>
    	      <ContentAdd onTouchTap={this.openAddQuestionModal.bind(this)} />
    	    </FloatingActionButton>
    	</div>
		<ModalAddQuestion user={this.props.user} currentTownhall={this.props.currentTownhall} submit={this.saveQuestion} open={this.state.openModal} />
      </div>
    );
  }
}

export default Questions;
