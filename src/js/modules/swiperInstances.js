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
    const forexchurchSwipers = document.querySelectorAll('[data-forexchurch-swiper]');

    forexchurchSwipers.forEach(function (swiperElement) {
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
                    slidesPerView: 2,
                }
            }
            // on: {
            //     slideChange: function () {
            //         updateActiveImage(this);
            //     }
            // }
        });
    });
}
