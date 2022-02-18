document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.modal'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.modal__dialog-close'),
        button = document.querySelector('.heading__btn'),
        body = document.querySelector('body');

    close.addEventListener('click', () => {
        overlay.classList.remove('show');
        body.classList.remove('fixed');
    });

    button.addEventListener('click', () => {
        overlay.classList.add('show');
        modal.classList.add('open');
    });

    overlay.addEventListener('click', (e) => {
        if(e.target !== modal) {
        overlay.classList.remove('show');
        body.classList.remove('fixed');
        }
    });

});

const swiper = new Swiper('.swiper', {
    loop: true,
    navigation: {
        nextEl: '.reviews__slider-next',
        prevEl: '.reviews__slider-prev',
    },

});