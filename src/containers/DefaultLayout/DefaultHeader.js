import React, {Component} from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, Nav, UncontrolledDropdown} from 'reactstrap';
import PropTypes from 'prop-types';

import {AppNavbarBrand, AppSidebarToggler} from '@coreui/react';
// import logo from '../../assets/img/brand/logo.svg'
import logo from '../../assets/images/logo2.jpg'
import sygnet from '../../assets/images/Logo.png'
// import sygnet from '../../assets/img/brand/sygnet.svg'
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 150, height: 55, alt: 'Sen bien' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'Sen bien' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />


        <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <Row>
                <Col md="4"><img src={'../../assets/img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" /></Col>
                <Col md="6"><h5 className="text-capitalize">{userData.lastName} {userData.firstName}</h5></Col>
              </Row>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/*<AppAsideToggler className="d-md-down-none" />*/}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
