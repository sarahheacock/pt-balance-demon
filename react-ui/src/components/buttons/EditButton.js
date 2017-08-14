import React from 'react';
import PropTypes from 'prop-types';
import { Button, NavItem } from 'react-bootstrap';
import moment from 'moment';

import { blogID, initialEdit, messageData, loginData, defaultData } from '../../data/data';


const EditButton = (props) => {

  const pathArr = window.location.pathname.split('/');
  const page = (pathArr[1] === "") ? "home" : pathArr[1];

  //=====STYLE OF BUTTON DEPENDING ON BUTTON TITLE====================================================
  const style = (props.title === "Edit") ?
    "info":
    ((props.title === "Add" || props.title === "Login" || props.title === "Login ") ?
      "primary":
      ((props.title === "Delete") ?
        "danger":
        "default"));


  //=====DETERMINE NEXT AND MODAL-TITLE FROM PAGE-SECTION==========================================
  const adminAuth = props.title === "Add" || props.title === "Edit" || props.title === "Delete";

  //NEED if launching modal
  const modalTitle = (adminAuth) ? `${props.title} Content` : props.title;
  let url = '';
  let dataObj = {};
  let message = '';


  //====admin page editting==============
  //props.dataObj will be the selected data point
  if(adminAuth){

    let result = {};
    if(props.title === "Edit" || props.title === "Add"){
      Object.keys(defaultData[page]).forEach((key) => {

        if(props.title === "Edit"){ //copy everything
          if(key === "date") result[key] = moment(props.dataObj[key]).format('LL');
          else result[key] = props.dataObj[key];
        }
        else if(props.title === "Add"){ //initialize everything to defaultData
          result[key] = defaultData[page][key];
        }

      });
    }
    else if(props.title === "Delete"){ //only possible in publications and news
      result._id = props.dataObj._id;
    }

    dataObj = Object.assign({}, result);

    if(props.title === "Delete") url = `/admin/edit/${blogID}/${page}/`;
    else if(props.title === "Add") url = `/admin/edit/${blogID}/${page}`;
    else if(props.title === "Edit") url = `/admin/edit/${blogID}/${page}/${props.dataObj._id}`;

  }
  else if(props.title === "Login" || props.title === "Login ") {
    Object.keys(loginData).forEach((k) => dataObj[k] = '');
    url = "/admin/login";
  }
  else if(props.title === "Send Message"){
    Object.keys(messageData).forEach((k) => dataObj[k] = '');
    url = "/user/sayHello";
  }



  //====THE ACTUAL BUTTON=====================================================

  const content = {
    message: message,
    edit: {
      ...initialEdit,
      modalTitle,
      url,
      dataObj
    }
  };


  //page editing buttons are hidden
  //if we are not updating edit, then navLink to next page
  //...otherwise wait
  const button = ((modalTitle === "Send Message") ?
      <a href="#" onClick={(e) => { if(e) e.preventDefault(); props.updateState(content); }}>
        <i className="fa fa-envelope" aria-hidden="true"></i>
      </a> :
      ((modalTitle === "Login") ?
        <a href="#" onClick={(e) => {
          if(e) e.preventDefault();
          props.updateState(content);
        }} >
          <span className="brand"><i className="fa fa-child large-icon" aria-hidden="true"></i>
            {"PBS"}
          </span>
        </a> :
        <Button bsStyle={style} onClick={(e) => { if(e) e.preventDefault(); props.updateState(content); }}>
          {props.title}
        </Button>)
      )

  return ( button );
}


export default EditButton;

EditButton.propTypes = {
  user: PropTypes.object.isRequired,
  dataObj: PropTypes.object.isRequired,

  updateState: PropTypes.func.isRequired,

  title: PropTypes.string.isRequired
};
