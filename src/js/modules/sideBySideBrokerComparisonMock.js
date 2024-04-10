/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * sideBySideBrokerComparisonMock
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
import sideBySideBrokersData from '../../_data/sideBySideBrokerComparisonMock.json'; // Assuming the JSON file is stored in src/data

export function sideBySideBrokerComparisonMock() {
  return {
    sideBySideBrokers: [], // Initially empty array to store sideBySideBrokers
    async getSideBySideBrokerComparisonMock() {
      try {
        // Directly assign the imported data to the sideBySideBrokers array
        this.sideBySideBrokers = sideBySideBrokersData;
      } catch (error) {
        console.error('Error loading breweries from mock:', error);
      }
    }
  }
}