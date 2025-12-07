//References https://www.sitepoint.com/css-houdini-3d-card-flip-animation/
//References https://micku7zu.github.io/vanilla-tilt.js/
//References https://gijsroge.github.io/tilt.js/
//References IA's for the compose and organization the JS


//CHARACTER'S CARD'S ANIMATED
const CARDS = document.querySelectorAll('.character-card');

CARDS.forEach(card => {
    card.addEventListener('mousemove', e => {
        const RECT = card.getBoundingClientRect();
        const X = e.clientX - RECT.left;
        const Y = e.clientY - RECT.top;
        const CENTER_X = RECT.width / 2;
        const CENTER_Y = RECT.height / 2;
        const DELTA_X = (X - CENTER_X) / CENTER_X;
        const DELTA_Y = (Y - CENTER_Y) / CENTER_Y;

        const TITL_X = DELTA_Y * 25; 
        const TILT_Y = DELTA_X * 25; 
        const SHADOW_X = DELTA_X * 30; 
        const SHADOW_Y = DELTA_Y * 30; 
        const GRADIENT_X = 50 + DELTA_X * 20; 
        const GRADIENT_Y = 50 + DELTA_Y * 20;

        card.querySelector('::before'); 
        card.style.setProperty('--grad-x', `${GRADIENT_X}%`);
        card.style.setProperty('--grad-y', `${GRADIENT_Y}%`);


        card.style.transform = `rotateX(${-TITL_X}deg) rotateY(${TILT_Y}deg)`;
        card.style.boxShadow = `${-SHADOW_X}px ${-SHADOW_Y}px 40px rgba(255, 0, 0, 0.7)`;
        card.classList.add('hovered');
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `rotateX(0deg) rotateY(0deg)`;
        card.style.boxShadow = `0 0 15px rgba(0,0,0,0.3)`;
        card.classList.remove('hovered');
    });
});
