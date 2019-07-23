import React, { Component } from 'react';
import { Table } from "reactstrap";

export default class BailleurListComponent extends Component {
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
    if (this.props.ok === false || this.props.listBailleur === null)
      return (
        <div>
          <h4>Veuillez Patienter...</h4>
        </div>);
    else {
      const {currentPage, todosPerPage} = this.state;

      // Logic for displaying todos
      const indexOfLastTodo = currentPage * todosPerPage;
      const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
      const currentTodos = this.props.listBailleur.slice(indexOfFirstTodo, indexOfLastTodo);

      // Logic for displaying page numbers
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(this.props.listBailleur.length / todosPerPage); i++) {
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
              <th>Nom du bailleur</th>
              <th>Numero pièce</th>
              <th>E-mail</th>
              <th>Téléphone</th>
              <th>Adresse</th>
              <th>Categorie</th>
            </tr>
            </thead>
            <tbody>
            {currentTodos.length > 0 ? (
              currentTodos.map(b => (
                <tr key={b.id}>
                  <td>{this.props.listBailleur.indexOf(b) + 1}</td>
                  <td>{b.bailleurNom}</td>
                  <td>{b.numeroPiece}</td>
                  <td>{b.email}</td>
                  <td>{b.telephone}</td>
                  <td>{b.adresse}</td>
                  <td>{b.bailleurCategorie ? 'Entreprise' : 'Particulier'}</td>
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
