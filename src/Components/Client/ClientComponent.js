import React from 'react';
import toastr from "toastr";
import Card from "reactstrap/es/Card";
import CardHeader from "reactstrap/es/CardHeader";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import {Button} from "reactstrap";
import CardBody from "reactstrap/es/CardBody";
import CardFooter from "reactstrap/es/CardFooter";
import Modal from "reactstrap/es/Modal";
import ModalHeader from "reactstrap/es/ModalHeader";
import ModalBody from "reactstrap/es/ModalBody";
import Form from "reactstrap/es/Form";
import FormGroup from "reactstrap/es/FormGroup";
import Label from "reactstrap/es/Label";
import Input from "reactstrap/es/Input";
import bienService from "../../services/bienService";
import ClientListComponent from "./ClientListComponent";

export default class ClientComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      ok: false,
      listClients: [],
      nom: '',
      CIN: '',
      prenom: '',
      email: '',
      telephone: '',
      error: '',
    };

    this.toggle = this.toggle.bind(this);
    this.getCIN = this.getCIN.bind(this);
    this.getNom = this.getNom.bind(this);
    this.getPrenom = this.getPrenom.bind(this);
    this.getEmail = this.getEmail.bind(this);
    this.getTelephone = this.getTelephone.bind(this);
    this.addClient = this.addClient.bind(this);
  }

  componentDidMount() {
    bienService.listClient().then((result) => {
      console.log(result);
      this.setState({
        listClients: result.data.data,
        ok: true
      });
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  getCIN(event) { this.setState({CIN: event.target.value}); }
  getNom(event) { this.setState({nom: event.target.value}); }
  getPrenom(event) { this.setState({prenom: event.target.value}); }
  getEmail(event) { this.setState({email: event.target.value}); }
  getTelephone(event) { this.setState({telephone: event.target.value}); }

  addClient(event) {
    event.preventDefault();
    if (this.state.nom && this.state.prenom && this.state.email && this.state.telephone && this.state.CIN) {
      console.log('enregistrer');
      const client = {
        CIN: this.state.CIN,
        nom: this.state.nom,
        prenom: this.state.prenom,
        email: this.state.email,
        phoneNumber: this.state.telephone,
      };
      bienService.addClient(client).then(result => {
        if (result.data.data) {
          console.log(result);
          this.clear();
          toastr.success('Opération effectuée avec success');
          this.setState({listClients: result.data.data})
        } else {
          toastr.error('Echec de l\'opération');
        }
      });
    } else {
      this.setState({ error: 'Veuillez renseigner tous les champs SVP'});
      toastr.error('Veuillez renseigner tous les champs SVP');
    }
  }

  clear() {
    this.setState({
      CIN: '',
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
    })
  }

  render() {
    return (
      <div>
        <Card>
          <CardHeader className="alert-success">
            <h1>
              Gestion des Clients
            </h1>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="alert-dark">
            <Row>
              <Col md="1" className="pull-left"><Button color="primary" onClick={this.toggle} className="mr-1">Ajouter</Button></Col>
              <Col md="11" className="text-center"><h3>Liste Clients</h3></Col>
            </Row>
          </CardHeader>
          <CardBody>
            <ClientListComponent listClients={this.state.listClients} ok={this.state.ok}/>
          </CardBody>
          <CardFooter>

          </CardFooter>
        </Card>
        <Modal className="modal-lg" isOpen={this.state.modal} fade toggle={this.toggle}>
          <ModalHeader toggle={this.toggle} className="text-center">Ajouter Client</ModalHeader>
          <ModalBody>
            <Form>
              <Row><Col md="12"><h5 className="text-danger text-bold"><i className={this.state.error !== '' ? 'fa fa-warning' : ''}>{this.state.error}</i></h5></Col></Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <Label>CIN :</Label>
                    <Input type="text" value={this.state.CIN} onChange={this.getCIN} required/>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label>Nom :</Label>
                    <Input type="text" value={this.state.nom} onChange={this.getNom} required/>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label>Prénom :</Label>
                    <Input type="text" value={this.state.prenom} onChange={this.getPrenom}/>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label>Téléphone :</Label>
                    <Input type="text" value={this.state.telephone} onChange={this.getTelephone}/>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label>Email :</Label>
                    <Input type="text" value={this.state.email} onChange={this.getEmail}/>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <button type="submit" className="btn btn-primary" onClick={this.addClient}>Enregistrer</button>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
