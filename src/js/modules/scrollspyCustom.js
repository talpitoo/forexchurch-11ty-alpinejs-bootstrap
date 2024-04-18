export function scrollspyCustom() {
    return {
        activeScrollspy: '',
        sections: [],
        init() {
            const toc = document.querySelector('#toc');
            if (toc) {
                // Add an initial call to setup for page load
                this.setupForCurrentTab();

                // Setup scrollspy functionality
                this.$watch('activeScrollspy', value => {
                    history.pushState({}, '', '#' + value);
                });

                requestAnimationFrame(() => {
                    this.updateActiveSection();
                });

                window.addEventListener('scroll', this.updateActiveSection.bind(this));

                // Adjusted setupTabChangeListener to ensure it's effective
                this.setupTabChangeListener();
            }
        },
        setupForCurrentTab() {
            if (toc) {
                this.scanSections();
                this.populateTOC();
                // Ensure the active section is updated on page load and tab change
                this.updateActiveSection();
            }
        },
        scanSections() {
            if (toc) {
                // Adjusted to correctly target the active tab's content
                const activeTabContent = document.querySelector('.tab-content .tab-pane.active'); // Adjust selector based on your tab's active class
                if (activeTabContent) {
                    this.sections = Array.from(activeTabContent.querySelectorAll('h2.forexchurch-anchor-offset')).map(h2 => h2.id);
                } else {
                    this.sections = Array.from(document.querySelectorAll('h2.forexchurch-anchor-offset')).map(h2 => h2.id);
                }
                this.activeScrollspy = this.sections.length > 0 ? this.sections[0] : '';
            }
        },
        populateTOC() {
            if (toc) {
                toc.innerHTML = this.sections.map(id => {
                    const text = document.getElementById(id)?.textContent || '';
                    return `<li class="ps-3 py-1"><a href="#${id}" class="text-decoration-none" :class="activeScrollspy === '${id}' ? 'list-bullet-active text-body' : 'text-muted'">${text}</a></li>`;
                }).join('');
            }
        },
        updateActiveSection() {
            if (toc) {
                let scrollY = window.pageYOffset;
                this.sections.forEach(sectionId => {
                    const section = document.getElementById(sectionId);
                    if (section && scrollY >= section.offsetTop - 10) {
                        this.activeScrollspy = sectionId;
                        // Exit the loop once the active section is found
                        return;
                    }
                });
            }
        },
        setupTabChangeListener() {
            if (toc) {
                document.querySelectorAll('.nav-tabs .nav-link').forEach(tab => {
                    tab.addEventListener('click', () => {
                        setTimeout(() => {
                            this.setupForCurrentTab();
                        }, 150); // Adjust delay if necessary
                    });
                });
            }
        }
    };
}
