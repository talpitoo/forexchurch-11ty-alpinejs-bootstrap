/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * swiper instances, https://swiperjs.com/get-started
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
// import Swiper from 'swiper/bundle'; // import Swiper bundle with all modules installed
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// import 'swiper/css/bundle'; // import styles bundle
// import 'swiper/css';
// import 'swiper/css/navigation';

export function initializeSwiper() {
    const forexchurchSwipers = document.querySelectorAll('[data-forexchurch-swiper]');

    forexchurchSwipers.forEach(function (swiperElement) {
        const swiperContainer = swiperElement.parentElement;
        const nextButton = swiperContainer.querySelector('.swiper-button-next');
        const prevButton = swiperContainer.querySelector('.swiper-button-prev');
        const pagination = swiperContainer.querySelector('.swiper-pagination');

        const swiper = new Swiper(swiperElement, {
            modules: [Navigation, Pagination],
            slidesPerView: 1,
            loop: true,
            pagination: {
                el: pagination,
                clickable: true,
            },
            navigation: {
                nextEl: nextButton,
                prevEl: prevButton,
            },
            breakpoints: {
                1024: {
                    slidesPerView: 3,
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
