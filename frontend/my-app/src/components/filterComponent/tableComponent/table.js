import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { dateFilter, multiSelectFilter, textFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider, { CSVExport, ColumnToggle } from 'react-bootstrap-table2-toolkit';

let crimedateFilter;
let weaponFilter;
let descriptionFilter;
let districtFilter;
let neighborhoodFilter;
let premiseFilter;

const { ExportCSVButton } = CSVExport;
const { ToggleList } = ColumnToggle;

const weaponSelectOptions = {
    0: 'KNIFE',
    1: 'HANDS',
    2: 'FIREARM',
    3: 'NONE'
};

const descriptionSelectOptions = {
    0: 'AUTO THEFT',
    1: 'ROBBERY',
    2: 'ASSUALT',
    3: 'HOMICIDE'
};

const districtSelectOptions = {
    0: 'NORTHWEST',
    1: 'NORTHEAST',
    2: 'CENTRAL',
    3: 'SOUTHERN'
};

const neighborhoodSelectOptions = {
    0: 'LANGSTON HUGHES',
    1: 'RIVERSIDE',
    2: 'BEVERLY HILLS'
};

const premiseSelectOptions = {
    0: 'STREET',
    1: 'ROW/TOWNHOUSE-OCC',
    2: 'LIQUOR STORE',
    3: 'ALLEY',
    4: 'DRIVEWAY',
    5: 'APT/CONDO'
};

const crimes = {};

const columns = [{
    dataField: 'id',
    text: 'Crime ID'
},{
    dataField: 'date',
    text: 'Date',
    filter: dateFilter({
        getFilter: (filter) => {
            crimedateFilter = filter;
        }
    })
},{
    dataField: 'location',
    text: 'Address',
    filter: textFilter()
},{
    dataField: 'description',
    text: 'Description',
    formatter: cell => descriptionSelectOptions[cell],
    filter: multiSelectFilter({
        getFilter: (filter) => {
            descriptionFilter = filter;
        },
        options: descriptionSelectOptions
    })
},{
    dataField: 'weapon',
    text: 'Weapon',
    formatter: cell => weaponSelectOptions[cell],
    filter: multiSelectFilter({
        getFilter: (filter) => {
            weaponFilter = filter;
        },
        options: weaponSelectOptions
    })
},{
    dataField: 'district',
    text: 'District',
    formatter: cell => districtSelectOptions[cell],
    filter: multiSelectFilter({
        getFilter: (filter) => {
            districtFilter = filter;
        },
        options: districtSelectOptions
    })
},{
    dataField: 'neighborhood',
    text: 'Neighborhood',
    formatter: cell => neighborhoodSelectOptions[cell],
    filter: multiSelectFilter({
        getFilter: (filter) => {
            neighborhoodFilter = filter;
        },
        options: neighborhoodSelectOptions
    })
},{
    dataField: 'long',
    text: 'Longitude'
},{
    dataField: 'lat',
    text: 'Latitude'
},{
    dataField: 'premise',
    text: 'Premise',
    formatter: cell => premiseSelectOptions[cell],
    filter: multiSelectFilter({
        getFilter: (filter) => {
            premiseFilter = filter;
        },
        options: premiseSelectOptions
    })
}];

class Table extends Component {
    render() {
        return (
            <ToolkitProvider keyfield='id' data={ crimes } columns={ columns } exportCSV={ { onlyExportFiltered: true, exportAll: false }} columnToggle>
                {
                    props => (
                        <div>
                            <ExportCSVButton {...props.csvProps }>Export</ExportCSVButton>
                            <ToggleList {...props.columnToggleProps } />
                            <hr />
                            <BootstrapTable {...props.baseProps} keyField='id' data={ crimes } columns={ columns } filter={ filterFactory()} />
                        </div>
                    )
                }
            </ToolkitProvider>
        
        );

    }


}

export default Table;
    