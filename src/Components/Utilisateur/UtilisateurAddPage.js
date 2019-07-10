import React from 'react';
import Form from "reactstrap/es/Form";
import Input from "reactstrap/es/Input";
import FormGroup from "reactstrap/es/FormGroup";
import Label from "reactstrap/es/Label";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import userService from '../../services/utilisateur.service';

export default class UtilisateurAddPage extends React.Component {
  constructor() {
    super();
    this.state = {
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      adresse: '',
      error: '',
      profil: '',
      listProfil: []
    };

    this.getNom = this.getNom.bind(this);
    this.getPrenom = this.getPrenom.bind(this);
    this.getEmail = this.getEmail.bind(this);
    this.getTelephone = this.getTelephone.bind(this);
    this.getAdresse = this.getAdresse.bind(this);
    this.addUser = this.addUser.bind(this);
    this.getProfil = this.getProfil.bind(this);
  }

  async componentDidMount() {
    const url = "http://localhost:8080/senebiensimmobilier-1.0-SNAPSHOT/rest/profil/all-activated";
    const response = await fetch(url, {method: "GET"});
    const data = await response.json();
    console.log(data);
    this.setState({
      listProfil: data
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
      userService.addUser(user);
      this.setState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        adresse: '',
        profil: '',
      })
    } else {
      this.setState({ error: 'Veuillez renseigner tous les champs SVP'})
    }
  }

  render() {
    return (
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
    )
  }
}
