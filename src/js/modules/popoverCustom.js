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
        },
        togglePopover() {
            this.openPopover = !this.openPopover;
            if (this.openPopover) {
                this.popperInstance.update();
                this.$refs.popoverCustom.style.display = 'block';
            } else {
                this.$refs.popoverCustom.style.display = 'none';
            }
        }
    };
}