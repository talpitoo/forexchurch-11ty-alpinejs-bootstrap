// ES Module imports
import Alpine from 'alpinejs';
// import persist from '@alpinejs/persist';
// import 'bootstrap/dist/js/bootstrap.bundle.min'; // Includes Bootstrap and Popper
import axios from 'axios';

// Import your custom modules
import { loadBreweries } from './modules/breweries';
import { countriesDropdown } from './modules/countries';
import { initializeSwiper } from './modules/swiperInstances';

// Initialize Alpine.js
window.Alpine = Alpine;
// Alpine.plugin(persist);
// Alpine.start();

window.loadBreweries = loadBreweries; // Make loadBreweries globally available
window.countriesDropdown = countriesDropdown; // Make loadBreweries globally available

// Custom initialization when DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    console.log('DOM is fully loaded');
    Alpine.start();

    // Initialize custom scripts or components
    loadBreweries();
    countriesDropdown();
    initializeSwiper();

    // Example Axios request
    // axios.get('https://api.example.com/data')
    //      .then(response => {
    //          console.log('Data fetched successfully:', response.data);
    //      })
    //      .catch(error => console.error('Error fetching data:', error));

    // Example usage of Bootstrap JavaScript components programmatically
    // var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
    //   keyboard: false
    // });
    // You can now show the modal programmatically
    // myModal.show();
});

// Alpine.js component or data initialization example
// Alpine.data('dropdown', () => ({
//     open: false,
//     toggle() {
//         this.open = !this.open;
//     }
// }));

// Listen for Alpine.js initialization for more complex setups
window.addEventListener('alpine:init', () => {
    // Initialize or configure Alpine.js plugins and components here
    console.log('Alpine.js has been initialized');
    // Alpine.data('dropdown', dropdown)
    // Alpine.store('myStore', { key: 'value' }); // Example for initializing a store

    // Register the loadBreweries function with Alpine
    Alpine.data('loadBreweries', loadBreweries);
    Alpine.data('countriesDropdown', countriesDropdown);

    // Basic Store Example in Alpine.
    // Alpine.store('nav', {
    //     isOpen: false,
    //     close() { return this.isOpen = false },
    //     open() { return this.isOpen = true },
    //     toggle() { return this.isOpen = !this.isOpen }
    // })
});

// Exporting modules for use in other files, if needed
export { axios }; // Example of exporting axios for reuse
