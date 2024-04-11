// import { TabulatorFull as Tabulator } from 'tabulator-tables';
// import axios from 'axios';

// const brokerDataUrls = {
//   'e-toro': '/data/brokers/e-toro.json',
//   'ic-markets': '/data/brokers/ic-markets.json',
//   'pepperstone': '/data/brokers/pepperstone.json',
//   'tickmill': '/data/brokers/tickmill.json',
// };

// const heightNavbar = 73;
// const heightDropdown = 82;

// const comparisonKeys = [
//   { key: "Headquarters", formatter: "plaintext" },
//   { key: "Regulators", formatter: "plaintext" },
//   { key: "Dealing Desk Type", formatter: "plaintext" },
//   { key: "Account Currencies", formatter: "plaintext" },
//   { key: "Funding Methods", formatter: "plaintext" },
//   { key: "Minimum Deposit", formatter: "plaintext" },
//   { key: "Trading Instruments", formatter: "plaintext" },
//   { key: "Forex Pairs", formatter: "plaintext" },
//   { key: "Average EUR/USD Spread", formatter: "html" },
//   { key: "Commission on Forex", formatter: "plaintext" },
//   // Add more keys as necessary
// ];

// export function brokerComparisonTableManual() {
//   return {
//     selectedBrokers: ['e-toro', 'ic-markets'], // Initialize with preselected brokers
//     table: null,
//     tableHeight: window.innerWidth < 768 ? (window.innerHeight - 85) : window.innerHeight - (heightNavbar + heightDropdown + 32),
//     columnWidth: window.innerWidth < 768 ? (window.innerWidth - 24) / 2 : "",
//     openSelectedBrokers: false,
//     searchText: '',

//     initTable() {
//       this.table = new Tabulator("#comparison-table", {
//         height: this.tableHeight,
//         layout: "fitColumns",
//         columns: [
//           { title: "Comparison Key", field: "key", frozen: true, headerSort: false },
//           // Broker columns will be added dynamically
//         ],
//       });

//       this.loadSelectedBrokersData();
//     },

//     toggleBroker(event) {
//       this.loadSelectedBrokersData();
//     },

//     clearAllBrokers() {
//       this.selectedBrokers = [];
//       this.loadSelectedBrokersData();
//     },

//     loadSelectedBrokersData() {
//       const fetchPromises = this.selectedBrokers.map(brokerId =>
//         axios.get(brokerDataUrls[brokerId])
//           .then(response => ({ brokerId, data: response.data }))
//       );

//       Promise.all(fetchPromises).then(brokersData => {
//         // Prepare and set the table columns based on the fetched data
//         this.prepareAndSetColumns(brokersData);
//         // Prepare and set the table data
//         this.prepareAndSetTableData(brokersData);
//       }).catch(error => console.error('Error loading broker data:', error));
//     },

//     prepareAndSetColumns(brokersData) {
//       const brokerColumns = brokersData.map(({ brokerId, data }) => ({
//         title: data.name, // Assuming each JSON has a 'name' field for the broker's name
//         field: brokerId,
//         headerSort: false,
//         formatter: (cell) => {
//           // Implement custom formatter logic here
//           // Example: return cell.getValue() with some HTML if needed
//           return cell.getValue();
//         },
//       }));

//       // Set columns dynamically, including the comparison key column
//       this.table.setColumns([
//         { title: "Comparison Key", field: "key", frozen: true, headerSort: false },
//         ...brokerColumns
//       ]);
//     },

//     prepareAndSetTableData(brokersData) {
//       const tableData = comparisonKeys.map((item) => {
//         const rowData = { key: item.key };
//         brokersData.forEach(({ brokerId, data }) => {
//           rowData[brokerId] = data[item.key] ? data[item.key] : "N/A"; // Use formatter if necessary
//         });
//         return rowData;
//       });

//       this.table.setData(tableData);
//     },
//   }
// }