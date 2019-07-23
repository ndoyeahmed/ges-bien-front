import React from 'react';
import bienService from "../../services/bienService";
import Card from "reactstrap/es/Card";
import CardHeader from "reactstrap/es/CardHeader";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import {Button} from "reactstrap";
import CardBody from "reactstrap/es/CardBody";
import CardFooter from "reactstrap/es/CardFooter";
import BailleurListComponent from "./BailleurListComponent";
import ModalHeader from "reactstrap/es/ModalHeader";
import ModalBody from "reactstrap/es/ModalBody";
import Form from "reactstrap/es/Form";
import FormGroup from "reactstrap/es/FormGroup";
import Modal from "reactstrap/es/Modal";
import Label from "reactstrap/es/Label";
import Input from "reactstrap/es/Input";
import toastr from "toastr";

export default class BailleurComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bailleurNom: '',
      numeroPiece: '',
      email: '',
      telephone: '',
      adresse: '',
      bailleurCategorie: '',
      error: '',
      modal: false,
      ok: false,
      listBailleur: [],
    };
    this.toggle = this.toggle.bind(this);
    this.getBailleurNom = this.getBailleurNom.bind(this);
    this.getNumeroPiece = this.getNumeroPiece.bind(this);
    this.getTelephone = this.getTelephone.bind(this);
    this.getEmail = this.getEmail.bind(this);
    this.getAdresse = this.getAdresse.bind(this);
    this.addBailleur = this.addBailleur.bind(this);
  }

  componentDidMount() {
    bienService.listBailleur().then((result) => {
      console.log(result);
      this.setState({
        listBailleur: result.data.data,
        ok: true
      });
    });
  }

  getBailleurNom(event) { this.setState({ bailleurNom: event.target.value }); }
  getNumeroPiece(event) { this.setState({ numeroPiece: event.target.value }); }
  getTelephone(event) { this.setState({ telephone: event.target.value }); }
  getEmail(event) { this.setState({ email: event.target.value }); }
  getAdresse(event) { this.setState({ adresse: event.target.value }); }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  addBailleur(event) {
    event.preventDefault();
    if (this.state.bailleurNom && this.state.numeroPiece && this.state.telephone && this.state.email && this.state.adresse) {
      console.log('enregistrer');
      const bailleur = {
        bailleurNom: this.state.bailleurNom,
        numeroPiece: this.state.numeroPiece,
        telephone: this.state.telephone,
        email: this.state.email,
        adresse: this.state.adresse,
      };
      bienService.addBailleur(bailleur).then(result => {
        if (result.data) {
          console.log(result);
          toastr.success('Opération effectuée avec success');
          this.setState({listBailleur: result.data.data})
        } else {
          toastr.error('Echec de l\'opération');
        }
      });
    } else {
      this.setState({ error: 'Veuillez renseigner tous les champs SVP'});
      toastr.error('Veuillez renseigner tous les champs SVP');
    }
  }

  render() {
    return (
      <div>
        <Card>
          <CardHeader className="alert-success">
            <h1>
              Gestion des Bailleurs
            </h1>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="alert-dark">
            <Row>
              <Col md="1" className="pull-left"><Button color="primary" onClick={this.toggle}
                                                        className="mr-1">Ajouter</Button></Col>
              <Col md="11" className="text-center"><h3>Liste Bailleur</h3></Col>
            </Row>
          </CardHeader>
          <CardBody>
            <BailleurListComponent listBailleur={this.state.listBailleur} ok={this.state.ok}/>
          </CardBody>
          <CardFooter>

          </CardFooter>
        </Card>

        <Modal className="modal-lg" isOpen={this.state.modal} fade toggle={this.toggle}>
          <ModalHeader toggle={this.toggle} className="text-center">Ajouter un bailleur</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.addUser}>
              <Row><Col md="12"><h5 className="text-danger text-bold"><i className={this.state.error !== '' ? 'fa fa-warning' : ''}>{this.state.error}</i></h5></Col></Row>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label>Nom bailleur :</Label>
                    <Input type="text" value={this.state.bailleurNom} onChange={this.getBailleurNom}/>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label>Numéro de piece :</Label>
                    <Input type="text" value={this.state.numeroPiece} onChange={this.getNumeroPiece}/>
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
                    <Label>E-mail :</Label>
                    <Input type="text" value={this.state.email} onChange={this.getEmail}/>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <Label>Adresse :</Label>
                    <Input type="textarea" value={this.state.adresse} onChange={this.getAdresse}/>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <button type="submit" className="btn btn-primary" onClick={this.addBailleur}>Enregistrer</button>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}
