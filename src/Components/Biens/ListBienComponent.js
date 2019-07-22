import React, {Component} from 'react';
import {Row, Table} from "reactstrap";
import Col from "reactstrap/es/Col";

export default class ListBienComponent extends Component {

  constructor() {
    super();
    this.state = {
      currentPage: 1,
      todosPerPage: 5
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  render() {
    if (this.props.ok === false || this.props.listBiens === null)
      return (
        <div>
          <h4>Veuillez Patienter...</h4>
        </div>);
    else {
      const widthImg = { height: '5rem', width: '5rem' };
      const {currentPage, todosPerPage} = this.state;

      // Logic for displaying todos
      const indexOfLastTodo = currentPage * todosPerPage;
      const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
      const currentTodos = this.props.listBiens.slice(indexOfFirstTodo, indexOfLastTodo);

      // Logic for displaying page numbers
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(this.props.listBiens.length / todosPerPage); i++) {
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
              <th>Photo</th>
              <th>Numéro bien</th>
              <th>Date</th>
              <th>Description</th>
              <th>Prix bailleur</th>
              <th>Surface</th>
              <th>Type</th>
              <th>Bailleur</th>
              <th className="text-center">Action</th>
            </tr>
            </thead>
            <tbody>
            {currentTodos.length > 0 ? (
              currentTodos.map(bien => (
                <tr key={bien.id}>
                  <td>{this.props.listBiens.indexOf(bien) + 1}</td>
                  <td><img alt="image to preview" style={widthImg} src={bien.photoList ? bien.photoList[0] ? bien.photoList[0].path ? bien.photoList[0].path : '' : '' : ''}/></td>
                  <td>{bien.bienNumero}</td>
                  <td>{bien.dateAjout}</td>
                  <td>{bien.description}</td>
                  <td>{bien.prixBailleur}</td>
                  <td>{bien.surface}</td>
                  <td>{bien.typebien.libelle}</td>
                  <td>{bien.bailleur.bailleurNom}</td>
                  <td>
                    <Row>
                      <Col md="6">
                        <button type="button" className="btn btn-primary" >
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
        </div>
      );
    }
  }
}
