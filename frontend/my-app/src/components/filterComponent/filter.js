import React, { Component } from 'react';
import { Button, Form, FormGroup, FormControl } from "react-bootstrap";
import DatePicker from "react-date-picker";

class Filter extends Component {

    constructor(props) {
        super(props);
        this.state = { lower_date: null, upper_date: null, address: "", neighborhood: "", type: "", weapon: "", district: "", premise: "", data: [], isLoggedIn: false, filters: [] }
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
        var queryStr = "http://54.81.156.189:3001/crimes/filter?";

        // Add the filters to the query
        if (this.state.neighborhood != "") queryStr += "neighborhood=" + this.state.neighborhood.toUpperCase() + "&";
        if (this.state.type != "") queryStr += "type=" + this.state.type.toUpperCase() + "&";
        if (this.state.weapon != "") queryStr += "weapon=" + this.state.weapon.toUpperCase() + "&";
        if (this.state.district != "") queryStr += "district=" + this.state.district.toUpperCase() + "&";
        if (this.state.premise != "") queryStr += "premise=" + this.state.premise.toUpperCase() + "&";
        if (this.state.lower_date != null) queryStr += "lower_date=" + String(this.state.lower_date) + "&";
        if (this.state.upper_date != null) queryStr += "upper_date=" + String(this.state.upper_date) + "&";


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
    onLowerDateChange(value) { this.setState({ lower_date: value }); this.getFilteredData() }
    onUpperDateChange(value) { this.setState({ upper_date: value }); this.getFilteredData() }
    onNeighborhoodChange() { this.setState({ neighborhood: String(this.neighborhood.current.value) }, () => { this.getFilteredData() }) }
    ontypeChange() { this.setState({ type: String(this.type.current.value) }, () => { this.getFilteredData() }) }
    onWeaponChange() { this.setState({ weapon: String(this.weapon.current.value) }, () => { this.getFilteredData() }) }
    onDistrictChange() { this.setState({ district: String(this.district.current.value) }, () => { this.getFilteredData() }) }
    onPremiseChange() { this.setState({ premise: String(this.premise.current.value) }, () => { this.getFilteredData() }) }

    saveFilter() {

        // If adding new filter
        if (this.filterName.current.value != "" && this.loadingFilterName.current.value == "") {

            // Add the filter to our filters
            this.props.userData.filters.push({
                filter_name: this.filterName.current.value, 
                lower_date: this.state.lower_date,
                upper_date: this.state.upper_date,
                neighborhood: this.state.neighborhood,
                type: this.state.type,
                weapon: this.state.weapon,
                district: this.state.district,
                premise: this.state.premise,
            });

            // Call HTTP request to save the new filter to DB
            fetch("http://54.81.156.189:3001/filter/user_filter", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "user_name": this.props.userData.user_name,
                    "token": this.props.userData.jwt,
                    "filter_name": this.filterName.current.value, 
                    "lower_date": this.state.lower_date == null ? "" : this.state.lower_date,
                    "upper_date": this.state.upper_date == null ? "" : this.state.upper_date,
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
            this.forceUpdate();
            
        }

        // If updating a filter
        else {

            // Loop through the filters to find the one being updated
            for(var x = 0; x < this.props.userData.filters.length; x++) {
                if (this.props.userData.filters[x].filter_name == this.loadingFilterName.current.value) {
                    
                    // Update forms in the UI then get the filtered Data
                    this.props.userData.filters[x].neighborhood = this.neighborhood.current.value;
                    this.props.userData.filters[x].type = this.type.current.value;
                    this.props.userData.filters[x].weapon = this.weapon.current.value;
                    this.props.userData.filters[x].district = this.district.current.value;
                    this.props.userData.filters[x].premise = this.premise.current.value;
                    this.props.userData.filters[x].lower_date = this.state.lower_date;
                    this.props.userData.filters[x].upper_date = this.state.upper_date;

                    // Call HTTP request to update the new filter in D
                    fetch("http://54.81.156.189:3001/filter/user_filter", {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "user_name": this.props.userData.user_name,
                            "token": this.props.userData.jwt,
                            "filter_name": this.loadingFilterName.current.value, 
                            "new_filter_name": (this.filterName.current.value.length == 0) ? this.loadingFilterName.current.value : this.filterName.current.value, 
                            "lower_date": this.state.lower_date == null ? "" : this.state.lower_date,
                            "upper_date": this.state.upper_date == null ? "" : this.state.upper_date,
                            "neighborhood": this.state.neighborhood.toUpperCase(),
                            "type": this.state.type.toUpperCase(),
                            "weapon": this.state.weapon.toUpperCase(),
                            "district": this.state.district.toUpperCase(),
                            "premise": this.state.premise.toUpperCase(),
                        })
                    }).then(res => res.json())
                        .then(
                        (result) => {
                                // If filter was saved
                                if (result) {
                                    // Update forms
                                    this.filterName.current.value = "";
                                    this.forceUpdate();
                                }
                            }    
                        )
                        this.props.userData.filters[x].filter_name = (this.filterName.current.value.length == 0) ? this.loadingFilterName.current.value : this.filterName.current.value;
                    
                }
            }
            
        }
        
    }

    loadFilter() {

        // Loop to find the correct filter
        for(var x = 0; x < this.props.userData.filters.length; x++) {
            if (this.props.userData.filters[x].filter_name == this.loadingFilterName.current.value) {
                
                // Update forms in the UI then get the filtered Data
                this.neighborhood.current.value = this.props.userData.filters[x].neighborhood;
                this.type.current.value = this.props.userData.filters[x].type;
                this.weapon.current.value = this.props.userData.filters[x].weapon;
                this.district.current.value = this.props.userData.filters[x].district;
                this.premise.current.value = this.props.userData.filters[x].premise;

                this.setState({
                    lower_date: (String(this.props.userData.filters[x].lower_date) == "1970-01-01T00:00:00.000Z") ? null : this.props.userData.filters[x].lower_date,
                    upper_date: (String(this.props.userData.filters[x].upper_date) == "1970-01-01T00:00:00.000Z") ? null : this.props.userData.filters[x].upper_date,
                    neighborhood: this.props.userData.filters[x].neighborhood,
                    type: this.props.userData.filters[x].type,
                    weapon: this.props.userData.filters[x].weapon,
                    district: this.props.userData.filters[x].district,
                    premise: this.props.userData.filters[x].premise
                }, () => {this.getFilteredData();})
                       
            }
        }
        
    }


    render() {
        this.state.isLoggedIn = this.props.userData.loggedIn;

        return (
            <div>
                <div class="filters">
                    <div id="filters-title">Filter Options</div>
                    <Form>
                        <Form.Row>

                            <div class="date-picker" style={{ display: 'inline-block' }}>
                                <Form.Group controlId="formGroupLowerDate">
                                    <Form.Label>Lower Date: </Form.Label> <tab></tab>
                                    <DatePicker onChange={this.onLowerDateChange.bind(this)} value={this.state.lower_date} disableCalendar={true} />
                                </Form.Group>
                            </div>
                            <div class="date-picker" style={{ display: 'inline-block' }}>
                                <Form.Group controlId="formGroupUpperDate">
                                    <Form.Label>Upper Date: </Form.Label> <tab></tab>
                                    <DatePicker onChange={this.onUpperDateChange.bind(this)} value={this.state.upper_date} disableCalendar={true} />
                                </Form.Group>
                            </div>
                        </Form.Row>

                        <Form.Group controlId="formGroupNeighborhood" >
                            <Form.Label>Neighborhood</Form.Label>
                            <Form.Control type="neighborhood" onChange={this.onNeighborhoodChange.bind(this)} ref={this.neighborhood} value={this.state.neighborhood} placeholder="Enter Neighborhood" />
                        </Form.Group>

                        <Form.Group controlId="formGridDescription">
                            <Form.Label>Crime Type</Form.Label>
                            <Form.Control as="select" onChange={this.ontypeChange.bind(this)} ref={this.type} value={this.state.type}>
                                <option></option>
                                <option>AGG. ASSAULT</option>
                                <option>ARSON</option>
                                <option>AUTO THEFT</option>
                                <option>BURGLARY</option>
                                <option>COMMON ASSAULT</option>
                                <option>HOMICIDE</option>
                                <option>LARCENRY</option>
                                <option>LARCENRY FROM AUTO</option>
                                <option>RAPE</option>
                                <option>SHOOTING</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formGridWeapon">
                            <Form.Label>Weapon</Form.Label>
                            <Form.Control as="select" onChange={this.onWeaponChange.bind(this)} ref={this.weapon} value={this.state.weapon}>
                                <option></option>
                                <option>FIRE</option>
                                <option>FIREARM</option>
                                <option>HANDS</option>
                                <option>KNIFE</option>
                                <option>NA</option>
                                <option>OTHER</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formGridDistrict">
                            <Form.Label>District</Form.Label>
                            <Form.Control as="select" onChange={this.onDistrictChange.bind(this)} ref={this.district} value={this.state.district}>
                                <option></option>
                                <option>CENTRAL</option>
                                <option>EASTERN</option>
                                <option>NORTHERN</option>
                                <option>NORTHEAST</option>
                                <option>NORTHWEST</option>
                                <option>SOUTHERN</option>
                                <option>SOUTHEAST</option>
                                <option>SOUTHWEST</option>
                                <option>WESTERN</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formGridPremise">
                            <Form.Label>Premise</Form.Label>
                            <Form.Control as="select" onChange={this.onPremiseChange.bind(this)} ref={this.premise} value={this.state.premise}>
                                <option></option>
                                <option>APT/CONDO - OCCUPIED</option>
                                <option>CONVENIENCE STORE</option>
                                <option>OTHER - INSIDE</option>
                                <option>OTHER - OUTSIDE</option>
                                <option>PARKING LOT-OUTSIDE</option>
                                <option>RETAIL/SMALL BUSINES</option>
                                <option>ROW/TOWNHOUSE-OCC</option>
                                <option>SCHOOL</option>
                                <option>STREET</option>
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

                                    { false ? (

                                    <Button id="user-filters-button" onClick={this.saveFilter.bind(this)}>
                                        Create Filter
                                    </Button>
                                    ):(
                                        <Button id="user-filters-button" onClick={this.saveFilter.bind(this)}>
                                        Update Filter
                                    </Button>
                                    )}
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
                                        Create Filter
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
