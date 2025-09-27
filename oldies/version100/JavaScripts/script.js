const menuLinks = document.querySelectorAll('.menu ul li a');

menuLinks.forEach(link => {
    link.addEventListener('mouseover', () => {
        let scale = 1.1;
        let interval = setInterval(() => {
            scale += 0.01;
            link.style.transform = `scale(${scale})`;

            if (scale >= 1.2) {
                clearInterval(interval);
            }
        }, 10);
    });
    link.addEventListener('mouseout', () => {
        link.style.transform = `scale(1)`;
    });
});

function smoothScroll(target, duration = 1000) {
    const targetElement = document.querySelector(target);
    const targetPosition = targetElement.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}



