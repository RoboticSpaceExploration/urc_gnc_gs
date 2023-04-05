import React, {Component} from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

function DataCard(props){
  const cardStyle = { height: "25vh", width: "20vw" };

  return (
    <Card style={cardStyle} >
      <Card.Title>{props.title}</Card.Title>
      <Row>
        <Col>
          Parameter
        </Col>
        <Col>
          Status
        </Col>
      </Row>
    </Card>
  );
}

export default DataCard;