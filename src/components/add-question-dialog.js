import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class DialogAddQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
      question: '',
      description: '',
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextProps.open !== this.state.open) {
      this.handleOpen();
    }
  }

  handleQuestionChange(e) {
     this.setState({question: e.target.value});
  }

  handleDescriptionChange(e) {
     this.setState({description: e.target.value});
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    console.log(this.props)
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.props.submit.bind(this)}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Add Your Question"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
        >
          <div>
            <TextField
              hintText="Your Question"
              floatingLabelText="Your Question"
              type="test"
              fullWidth={true}
              onChange={this.handleQuestionChange.bind(this)}
            />
          </div>
          <div>
            <TextField
              hintText="More Information"
              floatingLabelText="More Information (optional)"
              multiLine={true}
              rows={3}
              fullWidth={true}
              onChange={this.handleDescriptionChange}
            />
          </div>
        </Dialog>
      </div>
    );
  }
}
