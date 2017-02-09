import React, { Component } from 'react';
import base from '../configs/firebase';
import Question from '../components/question';
import AppBar from 'material-ui/AppBar';


class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    };
  }

  componentDidMount() {
    base.bindToState(`questions`, {
      context: this,
      state: 'questions',
      asArray: true
    });
  }

  render() {
    return (
      <div className="questions">
        <AppBar title="Town Hall Live Questions" style={{background:'#333739 '}} />
        {this.state.questions.sort((a, b) => a.votes < b.votes).map((item, index) => {
          return <Question
            name={item.name}
            description={item.description}
            votes={item.votes} />
        })}
      </div>
    );
  }
}

export default Questions;
