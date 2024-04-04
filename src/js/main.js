// ES Module imports
import Alpine from 'alpinejs';
import { radarChart } from './modules/radarChart';
import { tableAverageForexSpreads } from './modules/tableAverageForexSpreads';
// import persist from '@alpinejs/persist';
// import 'bootstrap/dist/js/bootstrap.bundle.min'; // Includes Bootstrap and Popper
import { createPopper } from '@popperjs/core';
import { popoverCustom } from './modules/popoverCustom';
import { scrollspyCustom } from './modules/scrollspyCustom';
import { loadBreweries } from './modules/breweries';
import { loadBreweriesMock } from './modules/breweriesMock';
import { tabulatorMock } from './modules/tabulatorMock';
// import { brokerComparison } from './modules/brokerComparison';
import { brokerComparisonTable } from './modules/brokerComparisonTable';
// import { brokerComparisonTableManual } from './modules/brokerComparisonTableManual';
import { countriesDropdown } from './modules/countries';
import { countriesDropdownComplex } from './modules/countriesComplex';
import { initializeSwiper } from './modules/swiperInstances';

// make modules globally available
window.Alpine = Alpine;
window.createPopper = createPopper;

// custom initialization when DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    console.log('DOM is fully loaded');
    Alpine.start();
    initializeSwiper();
    setTimeout(() => document.documentElement.classList.add("dom-loaded"), 300) // to avoid top navbar transitions on load
});

// listen for Alpine.js initialization for more complex setups
window.addEventListener('alpine:init', () => {
    // initialize or configure Alpine.js plugins and components here
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
    Alpine.data('radarChart', radarChart);
    Alpine.data('tableAverageForexSpreads', tableAverageForexSpreads);
    Alpine.data('popoverCustom', popoverCustom);
    Alpine.data('scrollspyCustom', scrollspyCustom);
    Alpine.data('loadBreweries', loadBreweries);
    Alpine.data('loadBreweriesMock', loadBreweriesMock);
    Alpine.data('tabulatorMock', tabulatorMock);
    // Alpine.data('brokerComparison', brokerComparison);
    Alpine.data('brokerComparisonTable', brokerComparisonTable);
    // Alpine.data('brokerComparisonTableManual', brokerComparisonTableManual);
    Alpine.data('countriesDropdown', countriesDropdown);
    Alpine.data('countriesDropdownComplex', countriesDropdownComplex);
});