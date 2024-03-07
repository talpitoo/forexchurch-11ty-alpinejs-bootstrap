import { TabulatorFull as Tabulator } from 'tabulator-tables';
import axios from 'axios';

const brokerDataUrls = {
  'e-toro': '/data/brokers/e-toro.json',
  'ic-markets': '/data/brokers/ic-markets.json',
  'broker-3': '/data/brokers/broker1.json',
  'broker-4': '/data/brokers/broker2.json',
  // Add more mappings as necessary
};

// Define comparison keys globally to avoid duplication
const comparisonKeys = [
  "Headquarters",
  "Regulators",
  "Dealing Desk Type",
  "Account Currencies",
  "Funding Methods",
  "Minimum Deposit",
  "Trading Instruments",
  "Forex Pairs",
  "Average EUR/USD Spread",
  "Average EUR/USD Spread Tooltip",
  "Commission on Forex",
  "Commission on Forex Tooltip",
  "Maximum Leverage",
  "Hedging Allowed",
  "Scalping Allowed",
  "Swap-Free Accounts",
  "VIP Accounts Offered",
  "PAMM/MAM Solutions",
  "API Solutions",
  "Platforms Offered",
  "VPS Offered",
  "Client Funds in Segregated Accounts",
  "Negative Balance Protection",
  "Account Types",
  "Safety/Regulation",
  "Fees",
  "Trading Platforms",
  "Assets Traded",
  "Deposits/Withdrawals",
  "Trader Education",
  "Customer Service",
];

export function brokerComparisonExample() {
  return {
    // selectedBrokers: [],
    selectedBrokers: ['e-toro', 'ic-markets'], // Initialize with preselected brokers
    table: null,

    // NOTE: this would initialize an empty table, and even the 'detail/first' column would be populated upon .json load
    // initTable() {
    //   this.table = new Tabulator("#comparison-table", {
    //     layout: "fitColumns",
    //     data: [],
    //     columns: [],
    //     placeholder: "Select a broker to start the comparison",
    //   });
    // },
    initTable() {
      // Pre-define the 'detail' column so it's always visible
      this.table = new Tabulator("#comparison-table", {
        layout: "fitColumns",
        data: this.prepareInitialData(),
        columns: [
          { title: " ", field: "detail", headerSort: false, frozen: true },
        ],
        placeholder: "Select a broker to start the comparison",
      });

      // Immediately load data for preselected brokers
      setTimeout(() => this.loadSelectedBrokersData(), 100);
    },

    prepareInitialData() {
      // Return an array of objects with 'detail' keys to populate the initial table data
      return comparisonKeys.map(detail => ({ detail }));
    },

    toggleBroker(event) {
      const brokerId = event.target.value;
      const isChecked = event.target.checked;
      this.selectedBrokers = isChecked ? [...this.selectedBrokers, brokerId] : this.selectedBrokers.filter(id => id !== brokerId);
      this.loadSelectedBrokersData();
    },

    loadSelectedBrokersData() {
      const fetchPromises = this.selectedBrokers.map(brokerId => axios.get(brokerDataUrls[brokerId]).then(response => response.data));

      Promise.all(fetchPromises).then(brokersData => {
        const columns = this.prepareColumns(brokersData);
        // Dynamically adjust data structure for Tabulator
        const tableData = this.prepareDataForTable(brokersData);
        this.table.setColumns(columns);
        this.table.setData(tableData);
      }).catch(error => console.error('Error loading broker data:', error));
    },

    prepareColumns(brokersData) {
      return [
        { title: " ", field: "detail", headerSort: false, frozen: true },
        // Additional broker columns will be added dynamically
        ...brokersData.map((broker, index) => ({
          title: broker.name, // Use broker name as column title
          field: this.selectedBrokers[index], // Use brokerId as field name for dynamic data mapping
          headerSort: false,
        })),
      ];
    },

    prepareDataForTable(brokersData) {
      return comparisonKeys.map(detail => ({
        detail,
        ...brokersData.reduce((acc, broker, index) => ({
          ...acc,
          [this.selectedBrokers[index]]: broker[detail] || "N/A", // Use detail as key, fallback to "N/A" if not found
        }), {}),
      }));
    },
  }
}
