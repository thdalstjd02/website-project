document.addEventListener('DOMContentLoaded', () => {
    const confettiContainer = document.getElementById('goldConfettiContainer');
    const numParticles = 150; // 콘페티 양

    if (!confettiContainer) {
        console.warn('Confetti container not found. Skipping confetti generation.');
        return;
    }

    // 현재 페이지의 URL을 확인하여 인트로 페이지인지 판단
    // 'intro.html'을 실제 인트로 페이지 파일명으로 변경해주세요.
    // 만약 파일명이 index.html이고 intro.html로 리다이렉트 된다면,
    // 이 스크립트가 실행되는 페이지는 'index.html'이므로, 그에 맞게 조정이 필요합니다.
    // 현재 HTML 코드상으로는 'intro.html'이 스플래시 스크린을 가진 페이지입니다.
    const isIntroPage = window.location.pathname.includes('intro.html'); 
    console.log('Is Intro Page:', isIntroPage, 'Current path:', window.location.pathname); // 디버깅용 로그

    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('confetti-particle');

        const randomX = Math.random();
        
        let randomDelay;
        let randomDuration;

        if (isIntroPage) {
            // 인트로 페이지에 특화된 속도 및 지속 시간 (더 짧게, 더 빨리)
            randomDelay = Math.random() * 0.5;   // 0~0.5초 지연 (거의 즉시 나타남)
            randomDuration = 1.5 + Math.random() * 1.5; // 1.5~3초 지속 (매우 빠르게 사라짐)
            
            // 인트로 페이지의 빠른 리다이렉션을 고려하여, 
            // 0% opacity에서 10% opacity로 빠르게 전환될 수 있도록 CSS의 @keyframes도 조정하는 것을 고려할 수 있습니다.
            // (현재 CSS에는 10%에서 opacity: 1이 되므로 괜찮을 것 같습니다.)

        } else {
            // 그 외 페이지의 일반적인 속도 및 지속 시간
            randomDelay = Math.random() * 5;   // 0~5초 지연
            randomDuration = 5 + Math.random() * 5; // 5~10초 지속
        }

        particle.style.setProperty('--random-x', randomX);
        particle.style.setProperty('--drift-x', (Math.random() - 0.5) * 200);
        particle.style.animationDelay = `${randomDelay}s`;
        particle.style.animationDuration = `${randomDuration}s`;

        // 초기 위치는 CSS @keyframes에서 translateY(-10vh)로 설정되므로 여기서는 필요 없을 수 있습니다.
        // 다만, 혹시 모를 경우를 대비해 그대로 두거나, CSS만으로 충분하다면 제거해도 됩니다.
        particle.style.left = `${randomX * 100}%`;
        particle.style.top = `-10%`; 

        confettiContainer.appendChild(particle);
    }
});