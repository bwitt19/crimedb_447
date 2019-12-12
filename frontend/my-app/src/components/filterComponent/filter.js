import React, { Component } from 'react';
import { Button, Form, FormGroup, FormControl } from "react-bootstrap";
import DatePicker from "react-date-picker";

class Filter extends Component {

    constructor(props) {
        super(props);
        this.state = { lowerDate: null, upperDate: null, address: "", neighborhood: "", type: "", weapon: "", district: "", premise: "", data: [], isLoggedIn: false, filters: [] }
        this.neighborhood = React.createRef();
        this.type = React.createRef();
        this.weapon = React.createRef();
        this.district = React.createRef();
        this.premise = React.createRef();
        this.filterName = React.createRef();
        this.loadingFilterName = React.createRef();
    }

    // Make the https request to get the crime data
    getFilteredData() {
        var queryStr = "http://localhost:3001/crimes/filter?";

        // Add the filters to the query
        if (this.state.neighborhood != "") queryStr += "neighborhood=" + this.state.neighborhood.toUpperCase() + "&";
        if (this.state.type != "") queryStr += "type=" + this.state.type.toUpperCase() + "&";
        if (this.state.weapon != "") queryStr += "weapon=" + this.state.weapon.toUpperCase() + "&";
        if (this.state.district != "") queryStr += "district=" + this.state.district.toUpperCase() + "&";
        if (this.state.premise != "") queryStr += "premise=" + this.state.premise.toUpperCase() + "&";


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
                    // If filtered crimes were fetched
                    if (result.success) {

                        this.setState({ data: result.crimes });
                        this.props.callback({ data: result.crimes });
                    }
                }

            )
    }

    // Upon any change, update values for HTTP request and call GET to get the filtered crimes
    onLowerDateChange(value) { this.setState({ lowerDate: value }); this.getFilteredData() }
    onUpperDateChange(value) { this.setState({ upperDate: value }); this.getFilteredData() }
    onNeighborhoodChange() { this.setState({ neighborhood: String(this.neighborhood.current.value) }, () => { this.getFilteredData() }) }
    ontypeChange() { this.setState({ type: String(this.type.current.value) }, () => { this.getFilteredData() }) }
    onWeaponChange() { this.setState({ weapon: String(this.weapon.current.value) }, () => { this.getFilteredData() }) }
    onDistrictChange() { this.setState({ district: String(this.district.current.value) }, () => { this.getFilteredData() }) }
    onPremiseChange() { this.setState({ premise: String(this.premise.current.value) }, () => { this.getFilteredData() }) }

    saveFilter() {

        // If updating filter
        if(this.filterName.current.value == this.loadingFilterName.current.value || this.filterName.current.value == "" && this.loadingFilterName.current.value != "") {
            
            
        }

        // If adding new filter
        else if (this.filterName.current.value != "" && this.loadingFilterName.current.value == "") {

            // Add the filter to our filters
            this.props.userData.filters.push({
                filter_name: this.filterName.current.value, 
                lowerDate: this.state.lowerDate,
                upperDate: this.state.upperDate,
                neighborhood: this.state.neighborhood,
                type: this.state.type,
                weapon: this.state.weapon,
                district: this.state.district,
                premise: this.state.premise,
            });

            // Call HTTP request to save the new filter to DB
            fetch("http://localhost:3001/filter/user_filter", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "user_name": this.props.userData.user_name,
                    "token": this.props.userData.jwt,
                    "filter_name": this.filterName.current.value, 
                    "lower_date": this.state.lowerDate == null ? "" : this.state.lowerDate,
                    "upper_date": this.state.upperDate == null ? "" : this.state.upperDate,
                    "neighborhood": this.state.neighborhood.toUpperCase(),
                    "type": this.state.type.toUpperCase(),
                    "weapon": this.state.weapon.toUpperCase(),
                    "district": this.state.district.toUpperCase(),
                    "premise": this.state.premise.toUpperCase(),
                })
            }).then(res => res.json())
                .then(
                    (result) => {
                        // If filtered crimes were fetched
                        if (result) {}
                    }    
                )

            // Update forms
            this.filterName.current.value = "";
            this.loadingFilterName.current.value = "hello";
            this.forceUpdate();
            
        }
        
    }

    loadFilter() {

    }


    render() {
        this.state.isLoggedIn = this.props.userData.loggedIn

        return (
            <div>
                <div class="filters">
                    <div id="filters-title">Filter Options</div>
                    <Form>
                        <Form.Row>

                            <div class="date-picker" style={{ display: 'inline-block' }}>
                                <Form.Group controlId="formGroupLowerDate">
                                    <Form.Label>Lower Date: </Form.Label> <tab></tab>
                                    <DatePicker onChange={this.onLowerDateChange.bind(this)} value={this.state.lowerDate} disableCalendar={true} />
                                </Form.Group>
                            </div>
                            <div class="date-picker" style={{ display: 'inline-block' }}>
                                <Form.Group controlId="formGroupUpperDate">
                                    <Form.Label>Upper Date: </Form.Label> <tab></tab>
                                    <DatePicker onChange={this.onUpperDateChange.bind(this)} value={this.state.upperDate} disableCalendar={true} />
                                </Form.Group>
                            </div>
                        </Form.Row>

                        <Form.Group controlId="formGroupNeighborhood" >
                            <Form.Label>Neighborhood</Form.Label>
                            <Form.Control type="neighborhood" onChange={this.onNeighborhoodChange.bind(this)} ref={this.neighborhood} value={this.state.neighborhood} placeholder="Enter Neighborhood" />
                        </Form.Group>

                        <Form.Group controlId="formGridDescription">
                            <Form.Label>Crime Type</Form.Label>
                            <Form.Control as="select" onChange={this.ontypeChange.bind(this)} ref={this.type} value={this.value}>
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
                            <Form.Control as="select" onChange={this.onWeaponChange.bind(this)} ref={this.weapon} value={this.state.weapon}>
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
                            <Form.Control as="select" onChange={this.onDistrictChange.bind(this)} ref={this.district} value={this.state.district}>
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
                        <Form.Group controlId="formGridPremise">
                            <Form.Label>Premise</Form.Label>
                            <Form.Control as="select" onChange={this.onPremiseChange.bind(this)} ref={this.premise} value={this.state.premise}>
                                <option></option>
                                <option>APT/Condo - Occupied</option>
                                <option>Convinience Store</option>
                                <option>Other - Inside</option>
                                <option>Other - Outside</option>
                                <option>Parking Lot-Outside</option>
                                <option>Retail/Small Busines</option>
                                <option>Row/Townhouse-OCC</option>
                                <option>School</option>
                                <option>Street</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </div>

                <div class="user-filters">
                    <div id="user-filters-title">User's Filters</div>

                    <Form>

                        {this.state.isLoggedIn ? (
                            <div>
                                <Form.Row>
                                    <Form.Group id="filter-name" controlId="formGroupFilterName" >
                                        <Form.Label>Filter Name</Form.Label>
                                        <Form.Control type="filterName" ref={this.filterName} placeholder="Enter Filter Name" />
                                    </Form.Group>

                                    <Button id="user-filters-button" onClick={this.saveFilter.bind(this)}>
                                        Save Filter
                                    </Button>
                                </Form.Row>

                                <Form.Group controlId="formGridUsersFilters">
                                    <Form.Label>Load Filter</Form.Label>
                                    <Form.Control as="select" onChange={this.loadFilter.bind(this)} ref={this.loadingFilterName} >
                                        <option></option>
                                        {/* Add all the user's filters to the drop-down menu */}
                                        {this.props.userData.filters.map(function(filter, index) {
                                            return <option>{filter.filter_name}</option>
                                        })} 
                                    </Form.Control>
                                </Form.Group>
                            </div>
                        ) : (
                            <div>
                                <Form.Row>
                                    <Form.Group id="filter-name" controlId="formGroupFilterName" >
                                        <Form.Label>Filter Name</Form.Label>
                                        <Form.Control type="filterName"  placeholder="Enter Filter Name" value="" disabled/>
                                    </Form.Group>

                                    <Button id="user-filters-button-disabled" onClick={this.saveFilter.bind(this)} disabled>
                                        Save Filter
                                    </Button>
                                </Form.Row>

                                <Form.Group controlId="formGridFilterDrop">
                                    <Form.Label>Load Filter</Form.Label>
                                    <Form.Control as="select" onChange={this.loadFilter.bind(this)} value="" disabled>
                                    </Form.Control>
                                </Form.Group>
                            </div>
                        )}
                    </Form>


                </div>
            </div>


        );

    }


}

export default Filter;
