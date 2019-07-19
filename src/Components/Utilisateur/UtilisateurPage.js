import React from 'react';
import UtilisateurListPage from "./UtilisateurListPage";
import UtilisateurAddPage from "./UtilisateurAddPage";
import Modal from "reactstrap/es/Modal";
import ModalHeader from "reactstrap/es/ModalHeader";
import ModalBody from "reactstrap/es/ModalBody";
import Card from "reactstrap/es/Card";
import CardBody from "reactstrap/es/CardBody";
import {Button} from "reactstrap";
import CardHeader from "reactstrap/es/CardHeader";
import CardFooter from "reactstrap/es/CardFooter";
import Col from "reactstrap/es/Col";
import Row from "reactstrap/es/Row";
import userService from '../../services/utilisateurService';

export default class UtilisateurPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      ok: false,
      listUser: []
    };

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    userService.listUser().then((result) => {
      console.log(result);
      this.setState({
        listUser: result.data,
        ok: true
      });
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    return (
      <div>
        <Card>
          <CardHeader className="alert-success">
            <h1>
              Gestion des utilisateurs
            </h1>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="alert-dark">
            <Row>
              <Col md="1" className="pull-left"><Button color="primary" onClick={this.toggle} className="mr-1">Ajouter</Button></Col>
              <Col md="11" className="text-center"><h3>Liste utilisateurs</h3></Col>
            </Row>
          </CardHeader>
          <CardBody>
            <UtilisateurListPage listUser={this.state.listUser} ok={this.state.ok}/>
          </CardBody>
          <CardFooter>

          </CardFooter>
        </Card>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader toggle={this.toggle} className="text-center">Ajouter utilisateur</ModalHeader>
          <ModalBody>
            <UtilisateurAddPage listUser={this.state.listUser}/>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
