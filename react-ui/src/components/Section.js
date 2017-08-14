import React from 'react';
import PropTypes from 'prop-types';
import { PageHeader } from 'react-bootstrap';

import Home from './routes/Home';
import Authors from './routes/Authors';
import Publications from './routes/Publications';
import News from './routes/News';

import EditButton from './buttons/EditButton';


const Section = (props) => {

  return (
    <div>
      {(props.data.length < 1) ?

        <div className="main-content">
          <PageHeader>{`${props.section.charAt(0).toUpperCase()}${props.section.slice(1)}`}</PageHeader>
          <div className="text-center">
            <EditButton
              user={props.user}
              dataObj={{}}
              updateState={props.updateState}
              title={"Add"}
              length={2}
            />
          </div>
        </div>:

        ((props.section === "home") ?
          <Home data={props.data} user={props.user} message={props.message} updateState={props.updateState}/> :
          ((props.section === "authors") ?
            <Authors data={props.data} user={props.user} message={props.message} updateState={props.updateState}/> :
            ((props.section === "publications") ?
              <Publications data={props.data} user={props.user} message={props.message} updateState={props.updateState}/> :
              ((props.section === "news") ?
                <News data={props.data} user={props.user} message={props.message} updateState={props.updateState}/> :
                <div>Error</div>))))
      }
    </div>
  );
};

export default Section;

Section.propsTypes = {
  section: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,

  updateState: PropTypes.func.isRequired
};
