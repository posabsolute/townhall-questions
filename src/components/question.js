import React, { Component } from 'react';
import base from '../configs/firebase';
import Badge from 'material-ui/Badge';
import PlusOneIcon from 'material-ui/svg-icons/social/plus-one';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {Card, CardActions, CardHeader} from 'material-ui/Card';



class Question extends Component {

  handleVote = () => {
    base.update(`questions/${this.props.uuid}`, {
      data: {votes: this.props.votes + 1},
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
          <FloatingActionButton className="vote-button" onTouchTap={this.handleVote}>
            <PlusOneIcon />
          </FloatingActionButton>
        </CardActions>
      </Card>
    );
  }
}

export default Question;
