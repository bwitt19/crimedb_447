import React, { Component } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Table from './tableComponent/table';

class Filter extends Component {
    render() {
        return (
            <Accordion>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        Table
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Table/>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        );

    }


}

export default Filter;