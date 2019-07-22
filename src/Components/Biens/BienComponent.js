import React, {Component} from 'react';
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
import toastr from 'toastr';

import bienService from '../../services/bienService';
import ListBienComponent from "./ListBienComponent";

export default class BienCompoenent extends Component {
  constructor() {
    super();
    this.state = {
      photo: '',
      description: '',
      prixBailleur: '',
      surface: '',
      typebien: '',
      bailleur: '',
      error: '',
      modal: false,
      ok: false,
      listBiens: [],
      listBailleur: [],
      listTypeBien: [],
      file: '', imagePreviewUrl: ''
    };
    this.toggle = this.toggle.bind(this);
    this.addBien = this.addBien.bind(this);
    this.getDescription = this.getDescription.bind(this);
    this.getPrixBailleur = this.getPrixBailleur.bind(this);
    this.getSurface = this.getSurface.bind(this);
    this.getTypeBien = this.getTypeBien.bind(this);
    this.getBailleur = this.getBailleur.bind(this);
    this.chooseImg = this.chooseImg.bind(this);
  }


  componentDidMount() {
    bienService.listBien().then((result) => {
      console.log(result.data.data);
      this.setState({listBiens: result.data.data, ok: true});
      bienService.listTypeBien().then((x) => this.setState({listTypeBien: x.data.data}));
      bienService.listBailleur().then((x) => this.setState({listBailleur: x.data.data}));
    })
  }

  chooseImg(e) {
    e.preventDefault();
    document.getElementById('uploadImg').click();
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
        photo: reader.result
      });
    };

    reader.readAsDataURL(file)
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  addBien(event) {
    event.preventDefault();
    bienService.addBien(this.state).then(result => {
      console.log(result);
      this.setState({listBiens: result.data.data});
      toastr.success('Opération effectuée avec success');
    })
  }

  getDescription(event) {
    this.setState({description: event.target.value});
  }

  getPrixBailleur(event) {
    this.setState({prixBailleur: event.target.value});
  }

  getSurface(event) {
    this.setState({surface: event.target.value});
  }

  getTypeBien(event) {
    this.setState({typebien: event.target.value});
  }

  getBailleur(event) {
    this.setState({bailleur: event.target.value});
  }

  render() {
    const inputStyle = { display: 'none' };
    const widthImg = { height: '300px', width: '400px' };
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
          <img alt="image to preview" style={widthImg} src={imagePreviewUrl}/>
      );
    } else {
      $imagePreview = (<div> </div>);
    }
    return (
      <div>
        <Card>
          <CardHeader className="alert-success">
            <h1>
              Gestion des Biens
            </h1>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="alert-dark">
            <Row>
              <Col md="1" className="pull-left"><Button color="primary" onClick={this.toggle}
                                                        className="mr-1">Ajouter</Button></Col>
              <Col md="11" className="text-center"><h3>Liste Biens</h3></Col>
            </Row>
          </CardHeader>
          <CardBody>
            <ListBienComponent listBiens={this.state.listBiens} ok={this.state.ok}/>
          </CardBody>
          <CardFooter>

          </CardFooter>
        </Card>
        <Modal className="modal-lg" isOpen={this.state.modal} fade toggle={this.toggle}>
          <ModalHeader toggle={this.toggle} className="text-center">Ajouter Bien</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.addBien}>
              <Row><Col md="12"><h5 className="text-danger text-bold"><i
                className={this.state.error !== '' ? 'fa fa-warning' : ''}>{this.state.error}</i></h5></Col></Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Button className="btn btn-default" onClick={this.chooseImg} >
                      Choisir image
                    </Button>
                    <input  id="uploadImg" className="fileInput"
                            type="file"
                            style={inputStyle}
                            onChange={(e)=>this._handleImageChange(e)} />
                    <div className="imgPreview">
                      {$imagePreview}
                    </div>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <Label>Description :</Label>
                    <Input type="textarea" value={this.state.description} onChange={this.getDescription}/>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label>Prix Bailleur :</Label>
                    <Input type="text" value={this.state.prixBailleur} onChange={this.getPrixBailleur}/>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label>Surface :</Label>
                    <Input type="text" value={this.state.surface} onChange={this.getSurface}/>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <Label>Type de Bien :</Label>
                    <Input value={this.state.typebien} type="select" name="typebien" id="typebien"
                           onChange={this.getTypeBien}>
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
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <Label>Bailleur :</Label>
                    <Input value={this.state.bailleur} type="select" name="bailleur" id="bailleur"
                           onChange={this.getBailleur}>
                      <option value={0}>Selectionnez</option>
                      {this.state.listBailleur && this.state.listBailleur.length > 0 ? (
                        this.state.listBailleur.map(p => (
                          <option key={p.id} value={p.id}>{p.bailleurNom}</option>
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
                    <button type="submit" className="btn btn-primary" onClick={this.addBien}>Enregistrer</button>
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
