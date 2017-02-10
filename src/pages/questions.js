import React, { Component } from 'react';
import base from '../configs/firebase';
import AppBar from 'material-ui/AppBar';
import Question from '../components/question';
import ModalAddQuestion from '../components/add-question-dialog';
import FlipMove from 'react-flip-move';

import './questions.css';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: undefined,
    };
  }

  componentDidMount() {
    base.bindToState(`questions`, {
      context: this,
      state: 'questions',
      asArray: true,
      queries: {
        orderByChild: 'votes'
      }
    });
  }

  saveQuestion() {
    var uuid = generateGuid();
    var voters = {};
    voters[this.props.user.uid] = true;
    if (this.state.question) {
      this.handleClose();
      base.post(`questions/${uuid}`, {
        data: {
          name: this.state.question,
          description: this.state.description,
          user: this.props.user.uid,
          uuid: uuid,
          votes: 1,
          voters: voters,
          townhall: this.props.currentTownhall.key,
          key: uuid,
        }
      });
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

  render() {
    var questions = this.state.questions ? this.state.questions.filter(question => parseInt(question.townhall, 10) === parseInt(this.props.currentTownhall.key, 10)) : undefined;
    return (
      <div className="questions-page">
        <AppBar className="appBar" title="Town Hall Live Questions" style={{background:'#333739'}} />
        <div className='questions'>
          <FlipMove>
          {questions && questions.reverse().map((item, index) => {
            return <Question
              name={item.name}
              description={item.description}
              votes={item.votes}
              voters={item.voters}
              uuid={item.uuid}
              key={item.key}
              user={this.props.user} />
          })}
          </FlipMove>
          {questions && !questions.length ? (<div className="question">There is currently no questions, be the first!</div>) : null }
        </div>
        <ModalAddQuestion user={this.props.user} currentTownhall={this.props.currentTownhall} submit={this.saveQuestion} open={this.state.openModal} />
      </div>
    );
  }
}

export default Questions;
