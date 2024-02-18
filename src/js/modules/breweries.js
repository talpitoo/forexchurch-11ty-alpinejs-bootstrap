/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * loadBreweries
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
import axios from 'axios'; // Import axios directly into the module

export function loadBreweries() {
  return {
    breweries: [], // Initially empty array to store breweries
    async getBreweries() {
      try {
        const response = await axios.get('https://api.openbrewerydb.org/breweries');
        this.breweries = response.data; // Populate the breweries array with the response data
      } catch (error) {
        console.error('Error fetching breweries:', error);
      }
    }
  }
}