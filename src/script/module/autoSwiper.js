
import Swiper from 'swiper/bundle';

import 'swiper/css/bundle';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';

export function autoSwiper() {

    const option = {
        loop: true,
        autoplay: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    }

    const swiper = new Swiper('.mySwiper', option);
}
