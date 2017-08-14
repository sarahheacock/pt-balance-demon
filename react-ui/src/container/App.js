import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';

//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AdminActionCreators from '../actions/admin';

//components
import Routes from '../components/Routes';
import Header from '../components/Header';
import Footer from '../components/Footer';


class App extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    message: PropTypes.string.isRequired,
    edit: PropTypes.object.isRequired
  }


  render(){
    const{ dispatch, user, data, message, edit } = this.props;
    //turns an object whose values are action creators (functions)
    //and wraps in dispatch (what causes state change)

    const updateState = bindActionCreators(AdminActionCreators.updateState, dispatch);
    const uploadFile = bindActionCreators(AdminActionCreators.uploadFile, dispatch);
    const getData = bindActionCreators(AdminActionCreators.getData, dispatch);
    const putData = bindActionCreators(AdminActionCreators.putData, dispatch);
    const postData = bindActionCreators(AdminActionCreators.postData, dispatch);
    const deleteData = bindActionCreators(AdminActionCreators.deleteData, dispatch);

    console.log("");
    console.log("user", user);
    console.log("data", data);
    console.log("message", message);
    console.log("edit", edit);

    return (
      <BrowserRouter>
        <div className="container-fluid">

          <Header
            user={user}
            links={[...Object.keys(data)]}

            getData={getData}
            updateState={updateState}
          />

          <Routes
            data={data}
            user={user}
            links={[...Object.keys(data), 'login']}
            message={message}

            updateState={updateState}
          />

          <Footer
            edit={edit}
            user={user}
            message={message}

            uploadFile={uploadFile}
            putData={putData}
            postData={postData}
            deleteData={deleteData}

            updateState={updateState}
          />
        </div>

      </BrowserRouter>

    );
  }
}

const mapStateToProps = state => (
  {
    user: state.user,
    data: state.data,
    message: state.message,
    edit: state.edit
  }
);


export default connect(mapStateToProps)(App);
