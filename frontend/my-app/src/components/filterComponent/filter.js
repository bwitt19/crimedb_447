import React, { Component } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

class Filter extends Component {
    render() {
        return (
            <Accordion>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        Filters
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        );

    }


}

export default Filter;