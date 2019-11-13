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

const crimes = [
    {
        id: 0,
        date: 'Mon Jul 30 2018 11:29:02 GMT-0400 (Eastern Daylight Time)',
        location: '3700 W GARRISON AVE',
        description: 0,
        weapon: 0,
        district: 0,
        neighborhood: 0,
        long: -76.678,
        lat:  39.344,
        premise: 0
    },
    {
        id: 1,
        date: 'Mon Jul 16 2018 00:07:15 GMT-0400 (Eastern Daylight Time)',
        location: '333 E EAST ST',
        description: 1,
        weapon: 0,
        district: 2,
        neighborhood: 1,
        long: -76.532,
        lat:  39.234,
        premise: 0
    },
    {
        id: 2,
        date: 'Wed May 09 2018 19:08:26 GMT-0400 (Eastern Daylight Time)',
        location: '370 W GARRISON AVE',
        description: 2,
        weapon: 1,
        district: 0,
        neighborhood: 0,
        long: -76.638,
        lat:  39.244,
        premise: 1
    },
    {
        id: 3,
        date: 'Mon Jul 30 2018 11:29:02 GMT-0400 (Eastern Daylight Time)',
        location: '888 N FAKE RD',
        description: 0,
        weapon: 0,
        district: 2,
        neighborhood: 1,
        long: -76.628,
        lat:  39.444,
        premise: 0
    },
    {
        id: 4,
        date: 'Thu Sep 20 2018 00:44:17 GMT-0400 (Eastern Daylight Time)',
        location: '37 W CHOPTANK AVE',
        description: 2,
        weapon: 2,
        district: 1,
        neighborhood: 2,
        long: -76.678,
        lat:  39.344,
        premise: 2
    },
    {
        id: 5,
        date: 'Mon Jul 30 2018 11:29:02 GMT-0400 (Eastern Daylight Time)',
        location: '3700 W GARRISON AVE',
        description: 0,
        weapon: 0,
        district: 0,
        neighborhood: 2,
        long: -76.678,
        lat:  39.344,
        premise: 3
    },
    {
        id: 6,
        date: 'Wed May 09 2018 19:08:26 GMT-0400 (Eastern Daylight Time)',
        location: '3700 W GARRISON AVE',
        description: 1,
        weapon: 1,
        district: 0,
        neighborhood: 0,
        long: -76.678,
        lat:  39.344,
        premise: 0
    },
    {
        id: 7,
        date: 'Mon Jul 30 2018 11:29:02 GMT-0400 (Eastern Daylight Time)',
        location: '4563 S SOUTH ST',
        description: 0,
        weapon: 3,
        district: 3,
        neighborhood: 1,
        long: -76.678,
        lat:  39.344,
        premise: 4
    },
    {
        id: 8,
        date: 'Mon Jul 30 2018 11:29:02 GMT-0400 (Eastern Daylight Time)',
        location: '99 FAKE ST',
        description: 3,
        weapon: 2,
        district: 3,
        neighborhood: 2,
        long: -76.678,
        lat:  39.344,
        premise: 5
    },
    {
        id: 9,
        date: 'Mon Jul 10 2018 11:29:02 GMT-0400 (Eastern Daylight Time)',
        location: '3700 W GARRISON AVE',
        description: 3,
        weapon: 0,
        district: 0,
        neighborhood: 0,
        long: -76.678,
        lat:  39.344,
        premise: 0
    },
];
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
            <ToolkitProvider keyfield='id' data={ crimes } columns={ columns } 
                exportCSV={ { onlyExportFiltered: true, exportAll: false }} columnToggle>
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
    