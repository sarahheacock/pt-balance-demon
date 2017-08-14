import React from 'react';
import PropTypes from 'prop-types';
import { PageHeader } from 'react-bootstrap';
import moment from 'moment';

import EditButton from '../buttons/EditButton';

const Publications = (props) => {
  const pubs = props.data.map((article, index) => (
    <div key={`article${index}`}>

        <div className="content">

            <h3>{article.title}</h3>
            {(article.description.split('\n')).map((p, i) => <p key={`publications0${i}`}>{p}<br /></p>)}
            <p><b>{(Array.isArray(article.authors)) ? article.authors.join(', ') : article.authors}</b></p>
            <p><b>{moment(article.date).format('LL')}</b></p>
            <div className="text-center">
              <a className="text-center" href="#" onClick={(e) => { if(e) e.preventDefault(); window.open(article.link); }}>
                <i className="ai ai-pubmed ai-3x"></i>
              </a>
            </div>
            <div className="text-center">
              <EditButton
                user={props.user}
                dataObj={article}
                updateState={props.updateState}
                title={"Edit"}
              />
              <EditButton
                user={props.user}
                dataObj={article}
                updateState={props.updateState}
                title={"Delete"}
              />
            </div>

        </div>

    </div>
  ));

  return (
    <div className="page">
      <div className="head">
        <PageHeader className="head-title">Publications and Presentations</PageHeader>
      </div>
      <div className="main-content">
        {pubs}
        <div className="text-center">
          <EditButton
            user={props.user}
            dataObj={props.data[0]}
            updateState={props.updateState}
            title={"Add"}
          />
        </div>
      </div>
    </div>
  );
}

export default Publications;

Publications.propsTypes = {
  data: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,

  updateState: PropTypes.func.isRequired
}
