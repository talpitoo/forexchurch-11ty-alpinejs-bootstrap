import { TabulatorFull as Tabulator } from 'tabulator-tables';
import axios from 'axios';

const brokerDataUrls = {
  'e-toro': '/data/brokers/broker1.json',
  'ic-markets': '/data/brokers/broker2.json',
  // Add more mappings as necessary
};

export function brokerComparisonExample() {
  return {
    selectedBrokers: [],
    table: null,

    initTable() {
      this.table = new Tabulator("#comparison-table", {
        layout: "fitColumns",
        data: [],
        columns: [],
        placeholder: "Select a broker to start the comparison",
      });
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
          { title: "Detail", field: "detail", headerSort: false, frozen: true },
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
      const comparisonKeys = ['headquarters', 'regulators', 'minimumDeposit', 'forexPairs'];
      
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
