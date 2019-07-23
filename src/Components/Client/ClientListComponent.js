import React from 'react';
import {Table} from "reactstrap";

export default class ClientListComponent extends React.Component {
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
    if (this.props.ok === false || this.props.listClients === null)
      return (
        <div>
          <h4>Veuillez Patienter...</h4>
        </div>);
    else {
      const {currentPage, todosPerPage} = this.state;

      // Logic for displaying todos
      const indexOfLastTodo = currentPage * todosPerPage;
      const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
      const currentTodos = this.props.listClients.slice(indexOfFirstTodo, indexOfLastTodo);

      // Logic for displaying page numbers
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(this.props.listClients.length / todosPerPage); i++) {
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
              <th>Matricule</th>
              <th>Date ajout</th>
              <th>CIN</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Téléphone</th>
              <th>Email</th>
            </tr>
            </thead>
            <tbody>
            {currentTodos.length > 0 ? (
              currentTodos.map(user => (
                <tr key={user.id}>
                  <td>{this.props.listClients.indexOf(user) + 1}</td>
                  <td>{user.matricule}</td>
                  <td>{user.date}</td>
                  <td>{user.CIN}</td>
                  <td>{user.nom}</td>
                  <td>{user.prenom}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.email}</td>
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
