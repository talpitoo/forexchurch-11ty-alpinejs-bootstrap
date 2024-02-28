/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * loadBreweriesMock
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
import breweriesData from '../../_data/breweries.json'; // Assuming the JSON file is stored in src/data

export function loadBreweriesMock() {
  return {
    breweries: [], // Initially empty array to store breweries
    async getBreweriesMock() {
      try {
        // Directly assign the imported data to the breweries array
        this.breweries = breweriesData;
      } catch (error) {
        console.error('Error loading breweries from mock:', error);
      }
    }
  }
}