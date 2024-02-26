/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * countries
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
import axios from 'axios'; // Import axios directly into the module

export function countriesDropdown() {
  return {
    countries: [],
    init() {
      axios.get('https://restcountries.com/v3.1/all')
        .then(response => {
          this.countries = response.data.map(country => ({
            name: country.name.common,
            alpha2Code: country.cca2,
            flag: this.flagEmoji(country.cca2) // Convert alpha2Code to flag emoji
          }));
          this.$nextTick(() => {
            this.$refs.select.insertAdjacentHTML('afterbegin', '<option selected>Choose a country</option>');
          });
        })
        .catch(error => console.error(error));
    },
    flagEmoji(countryCode) {
      return countryCode.toUpperCase().replace(/./g, char =>
        String.fromCodePoint(char.charCodeAt(0) + 127397)
      );
    }
  }
}