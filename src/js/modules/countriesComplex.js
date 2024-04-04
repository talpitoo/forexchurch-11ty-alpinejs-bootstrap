/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * countries
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
import axios from 'axios'; // Import axios directly into the module

export function countriesDropdownComplex() {
  return {
    searchText: '',
    countries: [],
    filteredCountries: [],
    openCountries: false,
    selectedCountryName: 'Select a country',
    selectedCountryCode: '', // Track the selected country code
    init() {
      axios.get('https://restcountries.com/v3.1/all')
        .then(response => {
          this.countries = response.data.map(country => ({
            name: country.name.common,
            alpha2Code: country.cca2,
            flag: this.flagEmoji(country.cca2)
          }));
          this.filteredCountries = this.countries;
        })
        .catch(error => console.error(error));
    },
    flagEmoji(countryCode) {
      return countryCode.toUpperCase().replace(/./g, char =>
        String.fromCodePoint(char.charCodeAt(0) + 127397)
      );
    },
    filterCountries() {
      this.filteredCountries = this.searchText === '' ?
        this.countries :
        this.countries.filter(country =>
          country.name.toLowerCase().includes(this.searchText.toLowerCase())
        );
    },
    selectCountry(countryCode, countryName) {
      this.selectedCountryCode = countryCode; // Update the selected country code
      this.selectedCountryName = countryName;
      this.openCountries = false; // Close the dropdown
    }
  }
}