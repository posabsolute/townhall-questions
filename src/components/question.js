import React, { Component } from 'react';
import base from '../configs/firebase';
import Badge from 'material-ui/Badge';
import {ImageExposurePlus1, ImageExposureNeg1} from 'material-ui/svg-icons';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {Card, CardActions, CardHeader} from 'material-ui/Card';



class Question extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  handleVote = (e) => {
  	e.preventDefault();
    var voters = this.props.voters || {};
    var vote = voters[this.props.user.uid] ? -1 : 1;
    voters[this.props.user.uid] = !voters[this.props.user.uid];

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
        <CardHeader
          title={this.props.name}
          subtitle={this.props.description}
          avatar={
            <Badge
              badgeContent={this.props.votes}
              primary={true}
            />
          }
        />
        <CardActions>
          <FloatingActionButton className="vote-button" onTouchTap={this.handleVote.bind(this)}>
            <ImageExposurePlus1 />
          </FloatingActionButton>
        </CardActions>
      </Card>
    );
  }
}

export default Question;
