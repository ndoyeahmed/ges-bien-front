import React from 'react';
import UtilisateurListPage from "./UtilisateurListPage";
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
import Form from "reactstrap/es/Form";
import FormGroup from "reactstrap/es/FormGroup";
import Label from "reactstrap/es/Label";
import Input from "reactstrap/es/Input";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css'

export default class UtilisateurPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      ok: false,
      listUser: [],
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      adresse: '',
      error: '',
      profil: '',
      listProfil: []
    };

    this.toggle = this.toggle.bind(this);
    this.getNom = this.getNom.bind(this);
    this.getPrenom = this.getPrenom.bind(this);
    this.getEmail = this.getEmail.bind(this);
    this.getTelephone = this.getTelephone.bind(this);
    this.getAdresse = this.getAdresse.bind(this);
    this.addUser = this.addUser.bind(this);
    this.getProfil = this.getProfil.bind(this);
  }

  componentDidMount() {
    userService.listUser().then((result) => {
      console.log(result);
      userService.listProfil().then((x) => {
        console.log(x);
        this.setState({listProfil: x.data});
      });
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

  getNom(event) { this.setState({nom: event.target.value}); }
  getPrenom(event) { this.setState({prenom: event.target.value}); }
  getEmail(event) { this.setState({email: event.target.value}); }
  getTelephone(event) { this.setState({telephone: event.target.value}); }
  getAdresse(event) { this.setState({adresse: event.target.value}); }
  getProfil(event) { this.setState({profil: event.target.value}); }

 addUser(event) {
    event.preventDefault();
    if (this.state.nom && this.state.prenom && this.state.email && this.state.telephone && this.state.adresse) {
      console.log('enregistrer');
      const user = {
        firstName: this.state.nom,
        lastName: this.state.prenom,
        email: this.state.email,
        phoneNumber: this.state.telephone,
        adresse: this.state.adresse,
        profil: {
          id: this.state.profil
        }
      };
      userService.addUser(user).then(result => {
        if (result.data.success) {
          console.log(result.data.success);
          toastr.success('Opération effectuée avec success');
          this.clear();
          this.setState({listUser: result.data.success})
        } else {
          console.log('Echec de l\'opération');
        }
      });
    } else {
      this.setState({ error: 'Veuillez renseigner tous les champs SVP'})
    }
  }

  clear() {
    this.setState({
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      adresse: '',
      profil: '',
    })
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
        <Modal className="modal-lg" isOpen={this.state.modal} fade toggle={this.toggle}>
          <ModalHeader toggle={this.toggle} className="text-center">Ajouter utilisateur</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.addUser}>
              <Row><Col md="12"><h5 className="text-danger text-bold"><i className={this.state.error !== '' ? 'fa fa-warning' : ''}>{this.state.error}</i></h5></Col></Row>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label>Nom :</Label>
                    <Input value={this.state.nom} onChange={this.getNom} required/>
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
                    <Label>Adresse :</Label>
                    <Input type="textarea" value={this.state.adresse} onChange={this.getAdresse}/>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <Label htmlFor="ccmonth">Profil :</Label>
                    <Input value={this.state.profil} type="select" name="profil" id="profil" onChange={this.getProfil}>
                      <option value={0}>Selectionnez</option>
                      {this.state.listProfil && this.state.listProfil.length > 0 ? (
                        this.state.listProfil.map(p => (
                          <option key={p.id} value={p.id}>{p.libelle}</option>
                        ))
                      ) : (
                        <option value={0}>Aucun résultat</option>
                      )}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <button type="submit" className="btn btn-primary" onClick={this.addUser}>Enregistrer</button>
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
