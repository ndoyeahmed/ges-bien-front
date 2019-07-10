import React from 'react';
import 'react-table/react-table.css';
import {Pagination, PaginationItem, PaginationLink, Row, Table} from "reactstrap";
import Col from "reactstrap/es/Col";

export default class UtilisateurListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ok: false,
            listUser: []
        };
    }

    async componentDidMount() {
        const url1 = "http://localhost:8080/senebiensimmobilier-1.0-SNAPSHOT/rest/user/all-user";
        const response = await fetch(url1, {method: "GET"});
        const data_event = await response.json();
        console.log(data_event);
        await this.setState({
            ok: true,
            listUser: data_event
        });
    }

    allUser() {
        const url = "http://localhost:8080/senebiensimmobilier-1.0-SNAPSHOT/rest/user/all-user";
        fetch(url, {
            method: "GET"
        }).then(response => response.json()).then(users => {
            this.setState({listUser: JSON.stringify(users)});
            console.log(this.state.listUser);
        })
    }

    render() {
        if (this.state.ok === false || this.state.listUser === null)
            return (
                <div>
                    <h4>Veuillez Patienter...</h4>
                </div>);
        else {
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
                    <th>Adresse</th>
                    <th className="text-center">Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.listUser.length > 0 ? (
                    this.state.listUser.map(user => (
                      <tr key={user.id}>
                        <td>{this.state.listUser.indexOf(user)+1}</td>
                        <td>{user.date}</td>
                        <td>{user.lastName}</td>
                        <td>{user.firstName}</td>
                        <td>{user.phoneNumber}</td>
                        <td>{user.email}</td>
                        <td>{user.adresse}</td>
                        <td>
                          <Row>
                            <Col md="6"><button className="btn btn-primary">Modifier</button></Col>
                            <Col md="6"><button className="btn btn-danger">Supprimer</button></Col>
                          </Row>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3}>Aucun résultat</td>
                    </tr>
                  )}
                  </tbody>
                </Table>
                <Pagination>
                  <PaginationItem disabled><PaginationLink previous tag="button">Precedent</PaginationLink></PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink next tag="button">Suivant</PaginationLink></PaginationItem>
                </Pagination>
              </div>
            );
        }
    }
}
