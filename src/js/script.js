document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.modal'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.modal__dialog-close'),
        button = document.querySelector('.heading__btn'),
        body = document.querySelector('body'),
        form = document.querySelector('.modal__dialog-form'),
        burger = document.querySelector('.burger'),
        mobile = document.querySelector('.mobile'),
        menuItems = mobile.querySelectorAll('li'),
        mobileClose = mobile.querySelector('.mobile__close'),
        formRequest = document.querySelector('.form__request');

    close.addEventListener('click', () => {
        overlay.classList.remove('show');
        modal.classList.remove('open');
        body.classList.remove('fixed');
    });

    button.addEventListener('click', () => {
        overlay.classList.add('show');
        modal.classList.add('open');
    });

    burger.addEventListener('click', () => {
        overlay.classList.add('show');
        mobile.classList.add('opened');
    });

    mobileClose.addEventListener('click', () => {
        overlay.classList.remove('show');
        mobile.classList.remove('opened');
    });

    menuItems.forEach((item) => {
        item.addEventListener('click', () => {
            overlay.classList.remove('show');
            mobile.classList.remove('opened');
        });
    });

    overlay.addEventListener('click', (e) => {
        console.log(e.target);
        if (e.target === overlay) {
            overlay.classList.remove('show');
            body.classList.remove('fixed');
            modal.classList.remove('open');
            mobile.classList.remove('opened');
        }
    });

    const swiper = new Swiper('.reviews__slider', {
        loop: true,
        navigation: {
            nextEl: '.reviews__slider-next',
            prevEl: '.reviews__slider-prev',
        },
    });

    const sliderFotos = new Swiper('.fotos__slider', {
        loop: true,
        slidesPerView: 2,
        spaceBetween: 30,
        centeredSlides: true,
        navigation: {
            nextEl: '.fotos__arrows-next',
            prevEl: '.fotos__arrows-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 30
            },
            // when window width is >= 640px
            768: {
                slidesPerView: "auto",
                spaceBetween: 30
            }
        }
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        let response = await fetch('/mailer/smart.php', {
            method: 'POST',
            body: new FormData(form)
        });

        let result = await response.json();

        if (result.message === 'success') {
            console.log('Success!');
            form.reset();
            overlay.classList.remove('show');
            modal.classList.remove('open');
            body.classList.remove('fixed');
            showMessage('Uw bestelling is geaccepteerd! Wij bellen u terug!');
        } else {
            console.log('Error!');
            form.reset();
            overlay.classList.remove('show');
            modal.classList.remove('open');
            body.classList.remove('fixed');
            showMessage('Er is iets fout gegaan!');
        }

    });

    function showMessage(text) {
        const message = document.querySelector('.message');
        message.textContent = text;
        overlay.classList.add('show');
        message.classList.add('open');
        const timerId = setTimeout(closeMessage, 5000);

        function closeMessage() {
            message.classList.remove('open');
            overlay.classList.remove('show');
            clearTimeout(timerId);
        }
    }

    formRequest.addEventListener('submit', async (e) => {
        e.preventDefault();

        let response = await fetch('/mailer/smart.php', {
            method: 'POST',
            body: new FormData(formRequest)
        });

        let result = await response.json();

        if (result.message === 'success') {
            console.log('Success!');
            formRequest.reset();
            showMessage('Uw bestelling is geaccepteerd! Wij bellen u terug!');
        } else {
            console.log('Error!');
            formRequest.reset();
            showMessage('Er is iets fout gegaan!');
        }

    });

});