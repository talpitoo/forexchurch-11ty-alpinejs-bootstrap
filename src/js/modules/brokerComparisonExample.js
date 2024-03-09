import { TabulatorFull as Tabulator } from 'tabulator-tables';
import axios from 'axios';

const brokerDataUrls = {
  'e-toro': '/data/brokers/e-toro.json',
  'ic-markets': '/data/brokers/ic-markets.json',
  'pepperstone': '/data/brokers/pepperstone.json',
  'tickmill': '/data/brokers/tickmill.json',
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
  // "Average EUR/USD Spread Tooltip",
  "Commission on Forex",
  // "Commission on Forex Tooltip",
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
    tableHeight: window.innerWidth < 768 ? (window.innerHeight - 85) : 'auto',
    columnWidth: window.innerWidth < 768 ? (window.innerWidth - 24) / 2 : "",

    initTable() {
      // Pre-define the 'detail' column so it's always visible
      this.table = new Tabulator("#comparison-table", {
        layout: window.innerWidth < 768 ? "" : "fitColumns",
        frozenRows: 1,
        height: this.tableHeight,
        // data: [], // NOTE: for simple setup
        // columns: [], // NOTE: for simple setup
        data: this.prepareInitialData(),
        columns: [
          {
            title: " ",
            field: "detail",
            headerSort: false,
            width: this.columnWidth,
            frozen: true
          },
        ],
        placeholder: "Select a broker to start the comparison",
      });

      window.addEventListener('resize', () => this.handleResize());

      // Immediately load data for preselected brokers
      setTimeout(() => this.loadSelectedBrokersData(), 100);
    },

    handleResize() {
      this.tableHeight = window.innerWidth < 768 ? (window.innerHeight - 85) : 'auto';
      this.columnWidth = window.innerWidth < 768 ? (window.innerWidth - 24) / 2 : '';
      this.table.setHeight(this.tableHeight);
      this.table.updateColumnDefinition('detail', { width: this.columnWidth });
      this.table.redraw(true);
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

    prepareDataForTable(brokersData) {
      return comparisonKeys.map(key => {
        let rowData = { detail: key }; // Using the detail titles directly from comparisonKeys

        brokersData.forEach((broker, index) => {
          if (key === "Average EUR/USD Spread" && broker["Average EUR/USD Spread Tooltip"]) {
            // Format the HTML content only for this specific cell
            rowData[this.selectedBrokers[index]] = `${broker[key]} <span class="text-warning"><svg class="" aria-hidden="true" width="20" height="20"><use href="/img/icons/symbol/svg/sprite.css.svg#info-circle"></use></svg>${broker["Average EUR/USD Spread Tooltip"]}</span>`;
          } else {
            // Directly assign the data for all other cells
            rowData[this.selectedBrokers[index]] = broker[key] ? broker[key].toString() : "N/A";
          }
        });

        return rowData;
      });
    },

    prepareColumns(brokersData) {
      return [
        {
          title: " ",
          field: "detail",
          headerSort: false,
          width: this.columnWidth,
          frozen: true
        },
        ...this.selectedBrokers.map((brokerId, index) => {
          // Determine if any broker data for this column requires HTML rendering
          let requiresHtml = comparisonKeys.includes("Average EUR/USD Spread") && brokersData[index]["Average EUR/USD Spread Tooltip"];
          const brokerInfo = brokersData[index];
          const titleContent = `
            <div class="d-flex flex-column align-items-center px-4">
              <img src="${brokerInfo.eleventyNavigation.logo}" alt="${brokerInfo.name} logo" class="object-fit-contain" width="64" height="64">
              <h6>${brokerInfo.name}</h6>
              <div class="mb-2">${brokerInfo.rating}</div>
              <a href="#" class="d-none d-lg-block btn btn-primary w-100">
                  Visit Broker
              </a>
              <a href="${brokerInfo.eleventyNavigation.url}" class="btn btn-underline">
                  <span>Read Review</span>
                  <svg class="text-tertiary ms-1" aria-hidden="true" width="24" height="24">
                      <use href="/img/icons/symbol/svg/sprite.css.svg#arrow-right"></use>
                  </svg>
              </a>
            </div>
          `;

          return {
            // title: brokersData[index].name,
            title: titleContent,
            field: brokerId,
            headerSort: false,
            width: this.columnWidth,
            formatter: requiresHtml ? "html" : undefined, // Apply HTML formatter conditionally based on data presence
          };
        }),
      ];
    },





  }
}
