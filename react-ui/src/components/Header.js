import React from 'react';
import PropTypes from 'prop-types';
import { blogID } from '../data/data';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import EditButton from './buttons/EditButton';
import { initialEdit, initialUser, initialMessage } from '../data/data';


class Header extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    links: PropTypes.array.isRequired,
    getData: PropTypes.func.isRequired,
    updateState: PropTypes.func.isRequired,
  }

  componentDidMount(){
    this.props.getData(`/user/${blogID}`);
  }

  logout = (e) => {
    const content = {
      edit: initialEdit,
      message: initialMessage,
      user: initialUser
    };
    this.props.updateState(content);
  }

  render(){

    const navItems = this.props.links.map((link, i) => {
      if(link === "home"){
        return (
          <LinkContainer key={link} exact to="/" >
            <NavItem>{link.toUpperCase()}</NavItem>
          </LinkContainer>
        );
      }
      else {
        return (
          <LinkContainer key={link} to={`/${link}`} >
            <NavItem>{link.toUpperCase()}</NavItem>
          </LinkContainer>
        );
      }
    });


    return (
      <div>
        <Navbar className="navigation" id="navigation">
          <Navbar.Header>
            <Navbar.Brand>
              <div>{(!(!this.props.user.token))?
                <a href="#" onClick={this.logout}>
                  Logout
                </a> :
                <EditButton
                  user={this.props.user}
                  dataObj={{}}
                  updateState={this.props.updateState}
                  title="Login"
                  length={2}
                />}</div>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>

          <Navbar.Collapse>
            <Nav className="ml-auto" navbar pullRight>
              {navItems}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
