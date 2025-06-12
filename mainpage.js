// mainpage.js (수정된 최종 코드)

window.addEventListener('load', () => {
    const volleyballIcon = document.getElementById('volleyball-icon');

    // 배구공 애니메이션('bounce')이 끝나면 실행됩니다.
    volleyballIcon.addEventListener('animationend', () => {

        // 애니메이션이 끝난 후, 'about.html' 페이지로 이동합니다.
        // 여기가 핵심 수정 부분입니다!
        window.location.href = 'about.html'; 

    });
});