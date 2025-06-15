window.addEventListener('load', () => {
    const volleyballIcon = document.getElementById('volleyball-icon');

    if (volleyballIcon) {
        volleyballIcon.addEventListener('animationend', () => {
            window.location.href = 'index.html'; 
        });
    }
});