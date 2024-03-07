import { TabulatorFull as Tabulator } from 'tabulator-tables';
import axios from 'axios';

const brokerDataUrls = {
  'e-toro': '/data/brokers/e-toro.json',
  'ic-markets': '/data/brokers/ic-markets.json',
  'broker-3': '/data/brokers/broker1.json',
  'broker-4': '/data/brokers/broker2.json',
  // Add more mappings as necessary
};

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
        data: this.prepareInitialData(), // Use an initial data setup to populate the 'detail' rows
        columns: [
          { title: " ", field: "detail", headerSort: false, frozen: true },
          // Additional broker columns will be added dynamically
        ],
        placeholder: "Select a broker to start the comparison",
      });

      // Immediately load data for preselected brokers
      setTimeout(() => {
        this.loadSelectedBrokersData();
      }, 100);
    },

    prepareInitialData() {
      // Define the comparison keys that will always be visible in the 'detail' column
      // const comparisonKeys = ['Headquarters', 'Regulators', 'Minimum Deposit', 'Forex Pairs'];

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
        "Customer Service"
      ];

      // Return an array of objects with 'detail' keys to populate the initial table data
      return comparisonKeys.map(detail => ({
        detail: detail // No broker data yet, just the detail labels
      }));
    },


    toggleBroker(event) {
      const brokerId = event.target.value;
      const isChecked = event.target.checked;

      if (isChecked) {
        if (!this.selectedBrokers.includes(brokerId)) {
          this.selectedBrokers.push(brokerId);
        }
      } else {
        this.selectedBrokers = this.selectedBrokers.filter(id => id !== brokerId);
      }

      this.loadSelectedBrokersData();
    },

    loadSelectedBrokersData() {
      const fetchPromises = this.selectedBrokers.map(brokerId =>
        axios.get(brokerDataUrls[brokerId]).then(response => response.data)
      );

      Promise.all(fetchPromises).then(brokersData => {
        const columns = [
          { title: " ", field: "detail", headerSort: false, frozen: true },
          ...this.selectedBrokers.map((brokerId, index) => ({
            title: brokersData[index].name, // Use broker name as column title
            field: brokerId, // Use brokerId as field name for dynamic data mapping
            headerSort: false
          }))
        ];

        // Dynamically adjust data structure for Tabulator
        const tableData = this.prepareDataForTable(brokersData);

        // Set columns and data
        this.table.setColumns(columns);
        this.table.setData(tableData);
      }).catch(error => {
        console.error('Error loading broker data:', error);
      });
    },

    prepareDataForTable(brokers) {
      // const comparisonKeys = ['headquarters', 'regulators', 'minimumDeposit', 'forexPairs'];
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
        "Customer Service"
      ];

      let dataStructure = comparisonKeys.map(detail => ({
        detail: this.formatDetailTitle(detail), // Optionally format detail titles for readability
      }));

      brokers.forEach((broker, index) => {
        comparisonKeys.forEach(key => {
          dataStructure.find(row => row.detail === this.formatDetailTitle(key))[this.selectedBrokers[index]] = broker[key];
        });
      });

      return dataStructure;
    },

    formatDetailTitle(detail) {
      // Convert keys to readable format if necessary, e.g., "minimumDeposit" to "Minimum Deposit"
      return detail.replace(/([A-Z])/g, ' $1').charAt(0).toUpperCase() + detail.replace(/([A-Z])/g, ' $1').slice(1);
    },
  }
}
