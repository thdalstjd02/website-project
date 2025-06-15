// music-player.js (링크만으로 모든 정보 자동 로드 버전 - 오류 수정)

// DOM 요소 가져오기
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const trackArtwork = document.getElementById('track-artwork');
const progressBar = document.getElementById('progress-bar');
const muteBtn = document.getElementById('mute-btn');
const volumeSlider = document.getElementById('volume-slider');

// 유튜브 API 스크립트 로드
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 재생 목록
const playlist = [
    'https://youtu.be/VKviyEGvb94?si=bFRUvmt8dsEYf-g-',
    'https://youtu.be/PYUxvyZ6uc0?si=84Y3Re6saQ4Rg4AX',
    'https://youtu.be/_oGEhRZkwcg?si=zogcYgPLqxOYiw0q'
];

function getVideoIdFromUrl(url) {
    try {
        const urlObj = new URL(url);
        if (urlObj.hostname.includes('youtube.com')) return urlObj.searchParams.get('v');
        if (urlObj.hostname.includes('youtu.be')) return urlObj.pathname.substring(1);
    } catch (e) { console.error('잘못된 URL 형식입니다:', url, e); }
    return null;
}

let player, currentTrackIndex = 0, isPlaying = false, progressInterval;

window.onYouTubeIframeAPIReady = function() {
    player = new YT.Player('youtube-player', {
        height: '1', width: '1', playerVars: { 'playsinline': 1, 'controls': 0, 'volume': 50 }, // 초기 볼륨을 50으로 설정
        events: { 'onReady': onPlayerReady, 'onStateChange': onPlayerStateChange }
    });
}

async function onPlayerReady(event) {
    await loadTrack(currentTrackIndex);
    // player.setVolume(100); // 이 줄은 제거합니다.
    player.setVolume(50); // 초기 볼륨을 50으로 설정
    volumeSlider.value = 50; // 슬라이더 값도 50으로 설정
    updateMuteButtonIcon();
}

function onPlayerStateChange(event) {
    isPlaying = (event.data === YT.PlayerState.PLAYING);
    playPauseBtn.textContent = isPlaying ? '⏸️' : '▶️';
    if (isPlaying) {
        progressInterval = setInterval(updateProgressBar, 1000);
    } else {
        clearInterval(progressInterval);
    }
    if (event.data === YT.PlayerState.ENDED) {
        nextTrack();
    }
}

async function loadTrack(trackIndex) {
    trackTitle.textContent = '로딩 중...';
    trackArtist.textContent = '';
    trackArtwork.src = '';
    clearInterval(progressInterval);
    progressBar.style.width = '0%';

    const trackUrl = playlist[trackIndex];

    try {
        // <<< UPDATED! 오류가 있었던 주소를 올바르게 수정했습니다. >>>
        const response = await fetch(`https://noembed.com/embed?url=${encodeURIComponent(trackUrl)}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // data.error가 있는 경우 (예: 비공개 영상) 처리
        if (data.error) {
            throw new Error(data.error);
        }

        trackTitle.textContent = data.title;
        trackArtist.textContent = data.author_name;
        trackArtwork.src = data.thumbnail_url;

        const videoId = getVideoIdFromUrl(trackUrl);
        if (player && typeof player.loadVideoById === 'function' && videoId) {
            player.loadVideoById(videoId);
        } else {
            throw new Error('플레이어가 준비되지 않았거나, 영상 ID를 추출할 수 없습니다.');
        }

    } catch (error) {
        console.error('트랙 로딩 중 에러 발생:', error);
        trackTitle.textContent = '재생할 수 없음';
        trackArtist.textContent = '링크를 확인해주세요.';
        trackArtwork.src = 'https://via.placeholder.com/180?text=Error';
    }
}

function updateProgressBar() {
    const currentTime = player.getCurrentTime();
    const duration = player.getDuration();
    if (duration > 0) {
        progressBar.style.width = `${(currentTime / duration) * 100}%`;
    }
}

async function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    await loadTrack(currentTrackIndex);
    player.playVideo();
}

async function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    await loadTrack(currentTrackIndex);
    player.playVideo();
}

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) player.pauseVideo();
    else player.playVideo();
});

volumeSlider.addEventListener('input', (e) => {
    player.setVolume(e.target.value);
    updateMuteButtonIcon();
});
muteBtn.addEventListener('click', () => {
    if (player.isMuted()) {
        player.unMute();
    } else {
        player.mute();
    }
    updateMuteButtonIcon();
});
function updateMuteButtonIcon() {
    if (player.isMuted() || player.getVolume() === 0) {
        muteBtn.textContent = '🔇';
        if (!player.isMuted()) volumeSlider.value = 0;
    } else {
        muteBtn.textContent = '🔊';
    }
}
prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);