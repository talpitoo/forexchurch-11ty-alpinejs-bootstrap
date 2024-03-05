export function scrollspyCustom() {
    return {
        activeScrollspy: 'our-conclusion', // Initialize with the first section id
        init() {
            this.$watch('activeScrollspy', value => {
                history.pushState({}, '', '#' + value);
            });

            // Using requestAnimationFrame to ensure the page is fully loaded
            // and all dynamic content heights are settled
            requestAnimationFrame(() => {
                this.updateActiveSection();
            });

            window.addEventListener('scroll', this.updateActiveSection.bind(this));
        },
        updateActiveSection() {
            let sections = ['our-conclusion', 'overview', 'account-types'];
            let scrollY = window.pageYOffset;

            // Reverse loop removed, replaced with direct iteration to better handle initial state
            for (let i = 0; i < sections.length; i++) {
                const section = document.getElementById(sections[i]);
                // This approach attempts to set the active section more accurately on initial load
                if (section && scrollY >= section.offsetTop - 10) {
                    this.activeScrollspy = sections[i];
                    // Continue checking until finding the last section that meets this condition
                }
            }
        }
    };
}
