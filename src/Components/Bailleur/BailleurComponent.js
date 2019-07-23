import React from 'react';
import bienService from "../../services/bienService";
import Card from "reactstrap/es/Card";
import CardHeader from "reactstrap/es/CardHeader";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import {Button} from "reactstrap";
import CardBody from "reactstrap/es/CardBody";
import UtilisateurListPage from "../Utilisateur/UtilisateurListPage";
import CardFooter from "reactstrap/es/CardFooter";
import BailleurListComponent from "./BailleurListComponent";

export default class BailleurComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ok: false,
      listBailleur: [],
    };
  }

  componentDidMount() {
    bienService.listBailleur().then((result) => {
      console.log(result);
      this.setState({
        listBailleur: result.data.data,
        ok: true
      });
    });
  }

  render() {
    return (
      <div>
        <Card>
          <CardHeader className="alert-success">
            <h1>
              Gestion des Bailleurs
            </h1>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="alert-dark">
            <Row>
              <Col md="1" className="pull-left"><Button color="primary" onClick={this.toggle}
                                                        className="mr-1">Ajouter</Button></Col>
              <Col md="11" className="text-center"><h3>Liste Bailleur</h3></Col>
            </Row>
          </CardHeader>
          <CardBody>
            <BailleurListComponent listBailleur={this.state.listBailleur} ok={this.state.ok}/>
          </CardBody>
          <CardFooter>

          </CardFooter>
        </Card>
      </div>
    )
  }
}
