window.addEventListener('load', () => {
    const volleyballIcon = document.getElementById('volleyball-icon');

    if (volleyballIcon) {
        // 배구공 애니메이션('bounce')이 끝나면 실행됩니다.
        volleyballIcon.addEventListener('animationend', () => {
            // 애니메이션이 끝난 후, 'index.html'(홈페이지)로 이동합니다.
            window.location.href = 'index.html'; 
        });
    }
});