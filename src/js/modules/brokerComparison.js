// import { TabulatorFull as Tabulator } from 'tabulator-tables';
// import axios from 'axios';
// import brokerEToro from '../../_data/brokers/e-toro.json';
// import brokerICMarkets from '../../_data/brokers/ic-markets.json';

// export function brokerComparison() {
//   return {
//     selectedBrokers: ['e-toro', 'ic-markets'], // Array of broker identifiers (e.g., 'e-toro', 'ic-markets')
//     table: null, // To hold the Tabulator instance

//     // Function to initialize the broker comparison table
//     initTable() {
//       // Define the table columns, including a custom formatter for the header to display name, logo, and rating
//       const columns = [
//         {title: "Broker Details", field: "detail", frozen: true, headerSort: false}, // Vertical header
//         // Dynamically generate columns for each selected broker
//         ...this.selectedBrokers.map(broker => ({
//           title: broker.toUpperCase(), // Placeholder, will be replaced by custom header
//           field: broker,
//           headerSort: false,
//           headerVertical: false,
//         //   headerFormatter: (cell, formatterParams, onRendered) => {
//         //     return this.formatHeader(cell.getValue());
//         //   }
//         headerFormatter: function(column, formatterParams, onRendered) {
//             // column - the column component
//             // Access column definition to get custom attributes you might have set
//             const title = column.getDefinition().title; // Or any other property you've set that contains the data
//             return `<div>${title}</div>`; // Adjust this to include any HTML structure you need
//         }        
//         }))
//       ];

//       // Placeholder for table data
//       let tableData = [
//         {detail: "Headquarters"},
//         {detail: "Regulators"},
//         {detail: "Dealing Desk Type"},
//         {detail: "Minimum Deposit"},
//         {detail: "Forex Pairs"}
//       ];

//       // Initialize Tabulator
//       this.table = new Tabulator("#comparison-table", {
//         layout: "fitColumns",
//         data: tableData,
//         columns: columns,
//         headerSort: false,
//         virtualDom: true,
//         dataTree: true,
//         dataTreeStartExpanded: true,
//         dataTreeChildField: "children",
//       });

//       // Load data for the selected brokers
//       this.loadBrokerData();
//     },

//     // Function to load data for each selected broker and update the table
//     // async loadBrokerData() {
//     //   const brokerDataPromises = this.selectedBrokers.map(broker =>
//     //     axios.get(`/data/brokers/${broker}.json`).then(response => response.data)
//     //   );

//     //   try {
//     //     const brokersData = await Promise.all(brokerDataPromises);
//     //     // Update the table with the fetched data
//     //     this.updateTable(brokersData);
//     //   } catch (error) {
//     //     console.error('Error fetching broker data:', error);
//     //   }
//     // },
//     // Updated method to load data from imports instead of making HTTP requests
//     loadBrokerData() {
//         // Map selectedBrokers to their respective imported data
//         const brokersData = this.selectedBrokers.map(broker => {
//           switch (broker) {
//             case 'e-toro':
//               return brokerEToro;
//             case 'ic-markets':
//               return brokerICMarkets;
//             // Add more cases as needed for additional brokers
//             default:
//               return {}; // Return an empty object or some default data structure for unknown brokers
//           }
//         });
  
//         // Update the table with the loaded data
//         this.updateTable(brokersData);
//       },

//     // Function to update the table with fetched broker data
//     updateTable(brokersData) {
//       // Update column headers with broker info (name, logo, rating)
//       this.table.setColumns([
//         ...this.table.getColumns(),
//         ...brokersData.map((data, index) => ({
//           title: data.name, // Customize as needed to include logo and rating
//           field: this.selectedBrokers[index],
//         }))
//       ]);

//       // Prepare and update table data for comparison
//       let comparisonData = this.prepareComparisonData(brokersData);
//       this.table.setData(comparisonData);
//     },

//     toggleBroker(event) {
//         const brokerId = event.target.value;
//         if (event.target.checked) {
//           // Add broker to selectedBrokers if checked
//           this.selectedBrokers.push(brokerId);
//         } else {
//           // Remove broker from selectedBrokers if unchecked
//           const index = this.selectedBrokers.indexOf(brokerId);
//           if (index > -1) {
//             this.selectedBrokers.splice(index, 1);
//           }
//         }
//         this.loadBrokerData(); // Reload broker data based on updated selection
//       },  

//     // Custom header formatter to include broker name, logo, and rating
//     formatHeader(value) {
//       // Implement logic to format header, returning HTML as a string
//       return `<div>${value.name}<br><img src="${value.logo}" style="height:50px;"><br>Rating: ${value.rating}</div>`;
//     },

//     // Prepare data for comparison by mapping broker details to the table structure
//     prepareComparisonData(brokersData) {
//       let data = [
//         { detail: "Headquarters", children: [] },
//         { detail: "Regulators", children: [] },
//         // Add other details as needed
//       ];

//       // Map broker details to the structure expected by Tabulator
//       brokersData.forEach(broker => {
//         data[0].children.push({ detail: broker.headquarters });
//         data[1].children.push({ detail: broker.regulators });
//         // Add other details as needed
//       });

//       return data;
//     }
//   }
// }
