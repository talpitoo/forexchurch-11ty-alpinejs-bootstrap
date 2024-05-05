export function popoverCustom() {
    return {
        openPopover: false,
        popperInstance: null,

        init() {
            this.popperInstance = createPopper(this.$refs.button, this.$refs.popoverCustom, {
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 8], // Adjust these values according to your needs
                        },
                    },
                ],
            });

            // Setup global click handler to close popover when clicking outside
            document.addEventListener('click', (event) => {
                // Check if the click is outside the popover and the button
                if (!this.$refs.popoverCustom.contains(event.target) && !this.$refs.button.contains(event.target)) {
                    this.closePopover();
                }
            });
        },

        togglePopover() {
            this.openPopover = !this.openPopover;
            this.updatePopoverDisplay();
        },

        closePopover() {
            this.openPopover = false;
            this.updatePopoverDisplay();
        },

        updatePopoverDisplay() {
            if (this.openPopover) {
                this.$refs.popoverCustom.style.display = 'block';
                this.popperInstance.update();
            } else {
                this.$refs.popoverCustom.style.display = 'none';
            }
        }

    };
}