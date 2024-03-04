// ES Module imports
import Alpine from 'alpinejs';
// import persist from '@alpinejs/persist';
// import 'bootstrap/dist/js/bootstrap.bundle.min'; // Includes Bootstrap and Popper
import { createPopper } from '@popperjs/core';
import { popoverCustom } from './modules/popoverCustom';
import { loadBreweries } from './modules/breweries';
import { loadBreweriesMock } from './modules/breweriesMock';
import { countriesDropdown } from './modules/countries';
import { initializeSwiper } from './modules/swiperInstances';

// Initialize Alpine.js
window.Alpine = Alpine;

// make loadBreweries and other functions globally available
window.createPopper = createPopper;
// window.popoverCustom = popoverCustom;
window.loadBreweries = loadBreweries;
window.loadBreweriesMock = loadBreweriesMock;
window.countriesDropdown = countriesDropdown;

// Custom initialization when DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    console.log('DOM is fully loaded');
    Alpine.start();

    // Initialize custom scripts or components
    // popoverCustom();
    loadBreweries();
    loadBreweriesMock();
    countriesDropdown();
    initializeSwiper();
});

// Listen for Alpine.js initialization for more complex setups
window.addEventListener('alpine:init', () => {
    // Initialize or configure Alpine.js plugins and components here
    console.log('Alpine.js has been initialized');
    // Alpine.plugin(persist);
    // Alpine.data('dropdown', dropdown)
    // Alpine.store('myStore', { key: 'value' }); // Example for initializing a store
    // Basic Store Example in Alpine.
    // Alpine.store('nav', {
    //     isOpen: false,
    //     close() { return this.isOpen = false },
    //     open() { return this.isOpen = true },
    //     toggle() { return this.isOpen = !this.isOpen }
    // })

    // register the individual modules with Alpine
    Alpine.data('popoverCustom', popoverCustom);
    Alpine.data('loadBreweries', loadBreweries);
    Alpine.data('loadBreweriesMock', loadBreweriesMock);
    Alpine.data('countriesDropdown', countriesDropdown);
});