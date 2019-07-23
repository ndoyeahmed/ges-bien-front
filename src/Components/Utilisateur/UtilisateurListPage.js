import React from 'react';
import 'react-table/react-table.css';
import {Pagination, PaginationItem, PaginationLink, Row, Table} from "reactstrap";
import Col from "reactstrap/es/Col";
import ModalHeader from "reactstrap/es/ModalHeader";
import ModalBody from "reactstrap/es/ModalBody";
import Form from "reactstrap/es/Form";
import FormGroup from "reactstrap/es/FormGroup";
import Label from "reactstrap/es/Label";
import Input from "reactstrap/es/Input";
import Modal from "reactstrap/es/Modal";

export default class UtilisateurListPage extends React.Component {

  constructor() {
    super();
    this.state = {
      updatedUser: null,
      modal: false,
      currentPage: 1,
      todosPerPage: 5
    };
    this.handleClick = this.handleClick.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }


  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  render() {
    if (this.props.ok === false || this.props.listUser === null)
      return (
        <div>
          <h4>Veuillez Patienter...</h4>
        </div>);
    else {
      const {currentPage, todosPerPage} = this.state;

      // Logic for displaying todos
      const indexOfLastTodo = currentPage * todosPerPage;
      const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
      const currentTodos = this.props.listUser.slice(indexOfFirstTodo, indexOfLastTodo);

      // Logic for displaying page numbers
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(this.props.listUser.length / todosPerPage); i++) {
        pageNumbers.push(i);
      }

      const renderPageNumbers = pageNumbers.map(number => {
        return (
          <li onClick={this.handleClick} key={number} id={number}
              className={currentPage === number ? 'page-item active' : 'page-item'}>
            <a key={number}
               id={number} className="page-link" onClick={this.handleClick}>
              {number}
            </a>
          </li>
        );
      });
      return (
        <div>
          <Table responsive striped>
            <thead>
            <tr>
              <th>N°</th>
              <th>Date ajout</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Téléphone</th>
              <th>Email</th>
              <th>Profile</th>
              <th className="text-center">Action</th>
            </tr>
            </thead>
            <tbody>
            {currentTodos.length > 0 ? (
              currentTodos.map(user => (
                <tr key={user.id}>
                  <td>{this.props.listUser.indexOf(user) + 1}</td>
                  <td>{user.date}</td>
                  <td>{user.nom}</td>
                  <td>{user.prenom}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.email}</td>
                  <td>{user.profil.libelle}</td>
                  <td>
                    <Row>
                      <Col md="6">
                        <button type="button" className="btn btn-primary" onClick={this.toggle} >
                        Modifier
                      </button>
                      </Col>
                      <Col md="6">
                        <button className="btn btn-danger">Supprimer</button>
                      </Col>
                    </Row>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>Aucun résultat</td>
              </tr>
            )}
            </tbody>
          </Table>
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center" id="page-numbers">
              {renderPageNumbers}
            </ul>
          </nav>

          <Modal className="modal-lg" isOpen={this.state.modal} fade toggle={this.toggle}>
            <ModalHeader toggle={this.toggle} className="text-center">Modifier utilisateur</ModalHeader>
            <ModalBody>
              <Form onSubmit={this.addUser}>
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
}
