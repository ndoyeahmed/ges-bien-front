import React from 'react';
import {Table} from "reactstrap";

export default class LocationListComponent extends React.Component {
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
    if (this.props.ok === false || this.props.listLocation === null)
      return (
        <div>
          <h4>Veuillez Patienter...</h4>
        </div>);
    else {
      const {currentPage, todosPerPage} = this.state;

      // Logic for displaying todos
      const indexOfLastTodo = currentPage * todosPerPage;
      const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
      const currentTodos = this.props.listLocation.slice(indexOfFirstTodo, indexOfLastTodo);

      // Logic for displaying page numbers
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(this.props.listLocation.length / todosPerPage); i++) {
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
              <th>Numéro location</th>
              <th>Date</th>
              <th>Caution</th>
              <th>Prix location</th>
              <th>Bien</th>
              <th>Client</th>
              <th>Téléphone client</th>
              <th>Agent</th>
              <th>Téléphone agent</th>
            </tr>
            </thead>
            <tbody>
            {currentTodos.length > 0 ? (
              currentTodos.map(user => (
                <tr key={user.id}>
                  <td>{this.props.listLocation.indexOf(user) + 1}</td>
                  <td>{user.locationNum}</td>
                  <td>{user.locationDate}</td>
                  <td>{user.montantCaution}</td>
                  <td>{user.prixLocation}</td>
                  <td>{user.bien.typebien.libelle} {user.bien.bienNumero}</td>
                  <td>{user.client.nom} {user.client.prenom} </td>
                  <td>{user.client.phoneNumber}</td>
                  <td>{user.user.nom} {user.user.nom}</td>
                  <td>{user.user.phoneNumber}</td>
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
