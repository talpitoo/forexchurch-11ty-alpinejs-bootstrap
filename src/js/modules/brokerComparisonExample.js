import { TabulatorFull as Tabulator } from 'tabulator-tables';
import axios from 'axios';

const heightNavbar = 73;
const heightDropdown = 82;
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
  const brokerList = [
    { id: 'e-toro', name: 'eToro' },
    { id: 'ic-markets', name: 'IC Markets' },
    { id: 'pepperstone', name: 'Pepperstone' },
    { id: 'tickmill', name: 'Tickmill' },
    { id: 'capital', name: 'Capital' }
  ];

  // Parse the URL parameters to get the selected brokers
  const getSelectedBrokersFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const brokersParam = urlParams.get('brokers');
    return brokersParam ? brokersParam.split('|') : [];
  };

  const generateBrokerDataUrls = selectedBrokers => {
    return selectedBrokers.reduce((urls, broker) => {
      urls[broker] = `/data/brokers/${broker}.json`;
      // NOTE: example .json URLs
      // 'e-toro': '/data/brokers/e-toro.json',
      // 'ic-markets': '/data/brokers/ic-markets.json',
      // 'pepperstone': '/data/brokers/pepperstone.json',
      // 'tickmill': '/data/brokers/tickmill.json',
      // Add more mappings as necessary
      return urls;
    }, {});
  };

  let selectedBrokers = getSelectedBrokersFromUrl();
  let brokerDataUrls = generateBrokerDataUrls(selectedBrokers);

  return {
    brokerList,
    selectedBrokers: selectedBrokers,
    brokerDataUrls: brokerDataUrls,
    table: null,
    tableHeight: window.innerWidth < 768 ? (window.innerHeight - 85) : window.innerHeight - (heightNavbar + heightDropdown + 32),
    columnWidth: window.innerWidth < 768 ? (window.innerWidth - 24) / 2 : "",
    openSelectedBrokers: false,
    searchText: '',

    initTable() {
      // Pre-define the 'detail' column so it's always visible
      this.table = new Tabulator("#comparison-table", {
        layout: window.innerWidth < 768 ? "" : "fitColumns",
        frozenRows: 1,
        height: this.tableHeight,
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
        placeholder: "Select two brokers to start the comparison",
        rowFormatter: function (row) {
          var data = row.getData();

          // if (data.col == "blue") {
            if (["Account Types", "Safety/Regulation", "Fees", "Trading Platforms", "Assets Traded", "Deposits/Withdrawals", "Trader Education", "Customer Service"].includes(data.detail)) {
            row.getCells().forEach(function (cell) {
              if (cell.getField() !== "detail") {
                // Example of manually setting star ratings based on cell value
                let value = parseInt(cell.getValue(), 10); // Ensure value is an integer
                let starsHtml = '';
                for (let i = 0; i < value; i++) {
                  starsHtml += '<span class="text-secondary me-2">&#9733;</span>';
                }
                cell.getElement().innerHTML = starsHtml + cell.getValue();
              }
            });
          }
        },

      });

      window.addEventListener('resize', () => this.handleResize());

      // Immediately load data for preselected brokers
      setTimeout(() => this.loadSelectedBrokersData(), 100);
    },

    handleResize() {
      this.tableHeight = window.innerWidth < 768 ? (window.innerHeight - 85) : window.innerHeight - (heightNavbar + heightDropdown + 32);
      this.columnWidth = window.innerWidth < 768 ? (window.innerWidth - 24) / 2 : '';
      this.table.setHeight(this.tableHeight);
      this.loadSelectedBrokersData();
    },

    prepareInitialData() {
      return comparisonKeys.map(detail => ({ detail }));
    },

    toggleBroker(event) {
      const broker = event.target.value;
      const index = selectedBrokers.indexOf(broker);
      if (index === -1) {
        selectedBrokers.push(broker);
      } else {
        selectedBrokers.splice(index, 1);
      }
      brokerDataUrls = generateBrokerDataUrls(selectedBrokers); // Update brokerDataUrls
      this.loadSelectedBrokersData();
      this.updateUrlWithSelectedBrokers();
    },

    clearAllBrokers() {
      this.selectedBrokers = [];
      selectedBrokers = [];
      brokerDataUrls = {};
      this.loadSelectedBrokersData(); // Update with new selectedBrokers and brokerDataUrls
      this.updateUrlWithSelectedBrokers(); // Update URL with empty selectedBrokers
    },

    updateUrlWithSelectedBrokers() {
      const urlParams = new URLSearchParams();
      urlParams.set('brokers', this.selectedBrokers.join('|'));
      const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
      window.history.replaceState({}, '', newUrl);
    },

    loadSelectedBrokersData() {
      const fetchPromises = selectedBrokers.map(brokerId => axios.get(brokerDataUrls[brokerId]).then(response => response.data));

      Promise.all(fetchPromises).then(brokersData => {
        const columns = this.prepareColumns(brokersData);
        const tableData = this.prepareDataForTable(brokersData);
        this.table.setColumns(columns);
        this.table.setData(tableData);
      }).catch(error => console.error('Error loading broker data:', error));
    },

    prepareDataForTable(brokersData) {
      return comparisonKeys.map(key => {
        let rowData = { detail: key };

        brokersData.forEach((broker, index) => {
          if (key === "Average EUR/USD Spread" && broker["Average EUR/USD Spread Tooltip"]) {
            rowData[selectedBrokers[index]] = `${broker[key]} <span class="text-warning"><svg class="" aria-hidden="true" width="20" height="20"><use href="/img/icons/symbol/svg/sprite.css.svg#info-circle"></use></svg>${broker["Average EUR/USD Spread Tooltip"]}</span>`;
          } else {
            rowData[selectedBrokers[index]] = broker[key] ? broker[key].toString() : "N/A";
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
        ...selectedBrokers.map((brokerId, index) => {
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
            title: titleContent,
            field: brokerId,
            headerSort: false,
            width: this.columnWidth,
            formatter: requiresHtml ? "html" : undefined,
          };
        }),
      ];
    },
  }
}
