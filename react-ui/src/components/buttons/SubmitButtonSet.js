import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { initialMessage, initialEdit, initialUser, errorStatus } from '../../data/data';

import AlertMessage from './AlertMessage';
import EditButton from './EditButton';


//SUBMIT ADMIN EDITTING, USER PROFILE EDIT, CREATE USER, RESERVE, AND CANCEL RESERVATION
class SubmitButtonSet extends React.Component {
  static propTypes = {
    editData: PropTypes.func.isRequired,
    updateState: PropTypes.func.isRequired,

    message: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    edit: PropTypes.object.isRequired,
  }


  pop = (e) => {
    this.props.updateState({
      edit: initialEdit,
      message: initialMessage
    });
  }

  logout = (e) => {
    this.props.updateState({
      edit: initialEdit,
      message: initialMessage,
      user: initialUser,
    });
  }


  submit = (e) => {
    const edit = this.props.edit;

    if(this.props.message === ""){ //if there is no error with the forms
      if(edit.modalTitle === "Delete Content") this.props.editData(edit.url);
      else this.props.editData(edit.url, edit.dataObj);
    }
    else {
      e.preventDefault();//prevent navLink
    }
  }


  render(){
    const edit = this.props.edit;
    const style = (edit.modalTitle.includes("Delete")) ?
      "danger":
      ((edit.modalTitle.includes("Edit") || edit.modalTitle.includes("Send")) ?
        "info":
        "primary");

    return (
      <div className="text-center">
        <AlertMessage
          message={this.props.message}
        />
        {
          (this.props.message !== errorStatus.expError) ?
            <div>
              <Button className="edit" bsStyle={style} onClick={this.submit}>
                {edit.modalTitle.replace(' Service', '').replace('Message', '')}
                {(edit.modalTitle).includes('Send') ?
                  <i className="fa fa-paper-plane" aria-hidden="true"></i>:
                  <span></span>
                }
              </Button>
              <Button className="edit" onClick={this.pop}>
                {(this.props.message === errorStatus.messageSuccess) ? "Close" : "Cancel"}
              </Button>
            </div> :
            <div>
              <EditButton
                user={this.props.user}
                updateState={this.props.updateState}
                dataObj={{}}
                title="Login "
                length={2}
              />
              <Button className="edit" onClick={this.logout}>
                Close
              </Button>
            </div>
        }
      </div>
    );
  }
}


export default SubmitButtonSet;
