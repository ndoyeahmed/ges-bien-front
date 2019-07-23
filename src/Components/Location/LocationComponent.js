import React from 'react';
import locationService from "../../services/locationService";
import bienService from "../../services/bienService";
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
import LocationListComponent from "./LocationListComponent";

export default class LocationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      ok: false,
      listLocation: [],
      listMois: [],
      listBiens: [],
      listB: [],
      listTypeBien: [],
      listClients: [],
      typebien: '',
      bien: '',
      client: '',
      montantCaution: '',
      prixLocation: '',
      montantApayer: '',
      montantVerse: '',
      montantTotal: '',
      error: '',
    };

    this.toggle = this.toggle.bind(this);
    this.addClient = this.addClient.bind(this);
    this.getTypeBien = this.getTypeBien.bind(this);
  }

  componentDidMount() {
    locationService.listLocations().then((result) => {
      console.log(result);
      this.setState({
        listLocation: result.data.data,
        ok: true
      });
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
    locationService.listMoisAnne().then(m => {
      console.log(m);
      this.setState({listMois: m.data.data});
    });
    bienService.listClient().then(result => {
      this.setState({listClients: result.data.data});
      bienService.listTypeBien().then(tb => {
        this.setState({listTypeBien: tb.data.data});
        bienService.listBien().then(bn => {
          this.setState({listB: bn.data.data});
        });
      });
    });
  }

  getTypeBien(event) {
    this.setState({typebien: event.target.value});
    const list = this.state.listB.filter(x => Number(x.typebien.id) === Number(event.target.value));
    this.setState({listBiens: list});
  }
  getBien(event) { this.setState({bien: event.target.value}); }
  getClient(event) { this.setState({client: event.target.value}); }
  getCaution(event) { this.setState({client: event.target.value}); }
  getPrixLocation(event) { this.setState({client: event.target.value}); }
  getMontantPayer(event) { this.setState({client: event.target.value}); }
  getMontantVerse(event) { this.setState({client: event.target.value}); }
  getMontantTotal(event) { this.setState({client: event.target.value}); }

  addClient(event) {
    event.preventDefault();
    if (this.state.nom && this.state.prenom && this.state.email && this.state.telephone && this.state.CIN) {
      console.log('enregistrer');
      const location = {
        CIN: this.state.CIN,
        nom: this.state.nom,
        prenom: this.state.prenom,
        email: this.state.email,
        phoneNumber: this.state.telephone,
      };
      locationService.addLocation(location).then(result => {
        if (result.data.data) {
          console.log(result);
          this.clear();
          toastr.success('Opération effectuée avec success');
          this.setState({listLocation: result.data.data})
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
              Gestion des demandes de location
            </h1>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="alert-dark">
            <Row>
              <Col md="1" className="pull-left"><Button color="primary" onClick={this.toggle} className="mr-1">Ajouter</Button></Col>
              <Col md="11" className="text-center"><h3>Liste Locations</h3></Col>
            </Row>
          </CardHeader>
          <CardBody>
            <LocationListComponent listLocation={this.state.listLocation} ok={this.state.ok}/>
          </CardBody>
          <CardFooter>

          </CardFooter>
        </Card>
        <Modal className="modal-lg" isOpen={this.state.modal} fade toggle={this.toggle}>
          <ModalHeader toggle={this.toggle} className="text-center">Ajouter Location</ModalHeader>
          <ModalBody>
            <Form>
              <Row><Col md="12"><h5 className="text-danger text-bold"><i className={this.state.error !== '' ? 'fa fa-warning' : ''}>{this.state.error}</i></h5></Col></Row>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label>Type de bien :</Label>
                    <Input value={this.state.typebien} type="select" name="typebien" id="typebien" onChange={this.getTypeBien}>
                      <option value={0}>Selectionnez</option>
                      {this.state.listTypeBien && this.state.listTypeBien.length > 0 ? (
                        this.state.listTypeBien.map(p => (
                          <option key={p.id} value={p.id}>{p.libelle}</option>
                        ))
                      ) : (
                        <option value={0}>Aucun résultat</option>
                      )}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label>Bien :</Label>
                    <Input value={this.state.bien} type="select" name="typebien" id="typebien" onChange={this.getBien}>
                      <option value={0}>Selectionnez</option>
                      {this.state.listBiens && this.state.listBiens.length > 0 ? (
                        this.state.listBiens.map(p => (
                          <option key={p.id} value={p.id}>{p.typebien.libelle} {p.bienNumero}</option>
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
                    <Label>Client :</Label>
                    <Input value={this.state.client} type="select" name="client" id="client" onChange={this.getClient}>
                      <option value={0}>Selectionnez</option>
                      {this.state.listClients && this.state.listClients.length > 0 ? (
                        this.state.listClients.map(p => (
                          <option key={p.id} value={p.id}>{p.nom} {p.prenom} {p.phoneNumber}</option>
                        ))
                      ) : (
                        <option value={0}>Aucun résultat</option>
                      )}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label>Montant caution :</Label>
                    <Input type="number" value={this.state.montantCaution} onChange={this.getCaution}/>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label>Prix location :</Label>
                    <Input type="text" value={this.state.prixLocation} onChange={this.getPrixLocation}/>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="8">
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <Label>Montant à payer :</Label>
                        <Input type="number" value={this.state.montantApayer} onChange={this.getMontantPayer}/>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <Label>Montant versé :</Label>
                        <Input type="number" value={this.state.montantVerse} onChange={this.getMontantVerse}/>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <Label>Montant total :</Label>
                        <Input type="number" value={this.state.montantTotal} onChange={this.getMontantTotal}/>
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <Label>Mois payé(s) :</Label>
                    {this.state.listMois && this.state.listMois.length > 0 ? (
                      this.state.listMois.map(m => (
                        <Col md="2" key={m.id}>
                          <FormGroup check key={m.id}>
                            <Label check key={m.id}>
                              <Input onChange={this.getMois} key={m.id} value={m.id} type="checkbox" />{' '}
                              {m.mois.mois}
                            </Label>
                          </FormGroup>
                        </Col>
                      ))
                    ) : (
                      <Row>
                        <Col md="4">
                          <h5>Aucun mois trouvé</h5>
                        </Col>
                      </Row>
                    )}
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
