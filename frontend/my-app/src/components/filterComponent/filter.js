import React, { Component } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Table from './tableComponent/table';
import { Button, Form, FormGroup, FormControl } from "react-bootstrap";
import moment from "moment";
import DatePicker from "react-date-picker";

class Filter extends Component {

    constructor(props) {
        super(props);
        this.state = { lowerDate: null, upperDate: null, address: "", neighborhood: "", crimeType: "", weapon: "", district: "", data: [] }
        this.address = React.createRef();
        this.neighborhood = React.createRef();
        this.crimeType = React.createRef();
        this.weapon = React.createRef();
        this.district = React.createRef();
    }

    // Make the https request to get the crime data
    getFilteredData() {
        var queryStr = "http://localhost:3001/crimes/filter?";

        // Add the filters to the query
        if (this.state.address != "") queryStr += "address=" + this.state.address.toUpperCase() + "&";
        if (this.state.neighborhood != "") queryStr += "neighborhood=" + this.state.neighborhood.toUpperCase() + "&";
        if (this.state.crimeType != "") queryStr += "crimeType=" + this.state.crimeType.toUpperCase() + "&";
        if (this.state.weapon != "") queryStr += "weapon=" + this.state.weapon.toUpperCase() + "&";
        if (this.state.district != "") queryStr += "district=" + this.state.district.toUpperCase() + "&";


        queryStr += "limit=500";

        fetch(queryStr, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(
                (result) => {
                    // If new user was created
                    if (result.success) {

                        this.setState({data: result.crimes}) ; 
                        this.props.callback({data: result.crimes});
                    }

                    // If error during new user creation
                    else {
                        
                    }
                }

            )
    }

    // Upon any change, update values for HTTP request and call GET to get the filtered crimes
    onLowerDateChange(value) { this.setState({ lowerDate: value }); this.getFilteredData() }
    onUpperDateChange(value) { this.setState({ upperDate: value }); this.getFilteredData() }
    onAddressChange() { this.setState({ address: String(this.address.current.value) }, () => { this.getFilteredData() }) }
    onNeighborhoodChange() { this.setState({ neighborhood: String(this.neighborhood.current.value) }, () => { this.getFilteredData() }) }
    onCrimeTypeChange() { this.setState({ crimeType: String(this.crimeType.current.value) }, () => { this.getFilteredData() }) }
    onWeaponChange() { this.setState({ weapon: String(this.weapon.current.value) }, () => { this.getFilteredData() }) }
    onDistrictChange() { this.setState({ district: String(this.district.current.value) }, () => { this.getFilteredData() }) }




    render() {
        return (
            <div class="filters">
                <Form>
                    <Form.Row>
                        <Form.Group controlId="formGroupLowerDate">
                            <Form.Label>Lower Date: </Form.Label> <tab></tab>
                            <DatePicker onChange={this.onLowerDateChange.bind(this)} value={this.state.lowerDate} disableCalendar={true} />
                        </Form.Group>
                        <Form.Group controlId="formGroupUpperDate">
                            <Form.Label>Upper Date: </Form.Label> <tab></tab>
                            <DatePicker onChange={this.onUpperDateChange.bind(this)} value={this.state.upperDate} disableCalendar={true} />
                        </Form.Group>
                    </Form.Row>


                    <Form.Group controlId="formGroupAddress" >
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="address" onChange={this.onAddressChange.bind(this)} ref={this.address} placeholder="Enter Address" />
                    </Form.Group>

                    <Form.Group controlId="formGroupNeighborhood" >
                        <Form.Label>Neighborhood</Form.Label>
                        <Form.Control type="neighborhood" onChange={this.onNeighborhoodChange.bind(this)} ref={this.neighborhood} placeholder="Enter Neighborhood" />
                    </Form.Group>

                    <Form.Group controlId="formGridDescription">
                        <Form.Label>Crime Type</Form.Label>
                        <Form.Control as="select" onChange={this.onCrimeTypeChange.bind(this)} ref={this.crimeType}>
                            <option></option>
                            <option>Agg. Assault</option>
                            <option>Arson</option>
                            <option>Auto Theft</option>
                            <option>Burglary</option>
                            <option>Common Assault</option>
                            <option>Homicide</option>
                            <option>Larceny</option>
                            <option>Larceny From Auto</option>
                            <option>Rape</option>
                            <option>Shooting</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formGridWeapon">
                        <Form.Label>Weapon</Form.Label>
                        <Form.Control as="select" onChange={this.onWeaponChange.bind(this)} ref={this.weapon}>
                            <option></option>
                            <option>Fire</option>
                            <option>Firearm</option>
                            <option>Hands</option>
                            <option>Knife</option>
                            <option>NA</option>
                            <option>Other</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formGridDistrict">
                        <Form.Label>District</Form.Label>
                        <Form.Control as="select" onChange={this.onDistrictChange.bind(this)} ref={this.district}>
                            <option></option>
                            <option>Central</option>
                            <option>Eastern</option>
                            <option>Northern</option>
                            <option>Northeast</option>
                            <option>Northwest</option>
                            <option>Southern</option>
                            <option>Southeast</option>
                            <option>Southwest</option>
                            <option>Western</option>
                        </Form.Control>
                    </Form.Group>

                </Form>

                {/* <Accordion>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            Table
                    </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Table />
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion> */}
            </div>



        );

    }


}

export default Filter;