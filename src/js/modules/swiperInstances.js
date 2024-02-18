/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * swiper instances, https://swiperjs.com/get-started
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
// import Swiper from 'swiper/bundle'; // import Swiper bundle with all modules installed
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
// import 'swiper/css/bundle'; // import styles bundle
// import 'swiper/css';
// import 'swiper/css/navigation';

export function initializeSwiper() {
    const monzSwipers = document.querySelectorAll('[data-monz-swiper]');

    function updateActiveImage(swiper) {
        const activeSlide = swiper.slides[swiper.activeIndex];
        const picture = activeSlide.querySelector('picture');
        if (picture) {
            const clonedPicture = picture.cloneNode(true);
            const targetFigure = document.querySelector('#monz-swiper-gallery-active-image');
            if (targetFigure) {
                targetFigure.innerHTML = '';
                targetFigure.appendChild(clonedPicture);
            }
        }
    }

    monzSwipers.forEach(function (swiperElement) {
        const swiperContainer = swiperElement.parentElement;
        const nextButton = swiperContainer.querySelector('.swiper-button-next');
        const prevButton = swiperContainer.querySelector('.swiper-button-prev');

        const swiper = new Swiper(swiperElement, {
            modules: [Navigation],
            slidesPerView: 1,
            loop: true,
            navigation: {
                nextEl: nextButton,
                prevEl: prevButton,
            },
            breakpoints: {
                1024: {
                    slidesPerView: 3,
                }
            },
            on: {
                slideChange: function () {
                    updateActiveImage(this);
                }
            }
        });
    });
}
