/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * tabulatorMock
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import breweriesData from '../../_data/breweries.json'; // Assuming the JSON file is stored in src/data

export function tabulatorMock() {
  return {
    initTable() {
      new Tabulator("#example-table", {
        data: breweriesData, //set initial table data
        autoColumns: true, //create columns from data field names
      });
    }
  }
}