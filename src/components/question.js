import React, { Component } from 'react';
import base from '../configs/firebase';
import {ActionThumbUp, ContentRemove} from 'material-ui/svg-icons';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';



class Question extends Component {

  constructor(props) {
    super(props);
    this.state = {
      voted: !!(this.props.voters && this.props.voters[this.props.user.uid])
    };
  }

  handleVote = (e) => {
  	e.preventDefault();
    var voters = this.props.voters || {};
    var vote = voters[this.props.user.uid] ? -1 : 1;
    voters[this.props.user.uid] = !voters[this.props.user.uid];
    this.setState({voted: voters[this.props.user.uid]});

    base.update(`questions/${this.props.uuid}`, {
      data: {
        votes: this.props.votes + vote,
        voters: voters
      },
      then(err){
        if(err){
          console.error(err);
        }
      }
    });
  };

  render() {
    return (
      <Card className="question">
        <CardTitle className="cardHeader" title={this.props.name} subtitle={this.props.description} />
        <CardText className="votesContainer">
          <div className="votes"><strong>{this.props.votes} upvotes</strong></div>
          <FloatingActionButton
            className="vote-button"
            mini={true}
            onTouchTap={this.handleVote.bind(this)}
            backgroundColor={this.state.voted ? "#f44336" : "#009ABF"}
          >
            {this.state.voted ? <ContentRemove /> : <ActionThumbUp />}
          </FloatingActionButton>
        </CardText>
      </Card>
    );
  }
}

export default Question;
