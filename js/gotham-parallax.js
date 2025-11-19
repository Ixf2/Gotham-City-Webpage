window.addEventListener('scroll', function() {
    const scrolled = window.scrollY;
    // Batman empieza en -200px y se mueve hacia 0px (en pantalla)
    // El 0.5 es un factor de velocidad (más lento que el scroll de la página)
    const newLeft = -200 + (scrolled * 0.5);

    // Asegurar que no se mueva demasiado hacia la derecha (por ejemplo, hasta 0)
    const finalLeft = Math.min(0, newLeft);

    document.querySelector('.layer-batman').style.transform = `translateX(${finalLeft}px)`;
});