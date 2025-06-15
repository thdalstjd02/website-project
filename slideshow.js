let slideIndex = 0;
showSlides(); // 페이지가 로드되면 함수 최초 실행

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("slide");
    
    if (slides.length === 0) return; // 슬라이드가 없으면 함수 중단

    // 모든 슬라이드를 숨김
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }

    slideIndex++; // 다음 슬라이드 인덱스로 이동
    
    // 마지막 슬라이드까지 갔으면 처음으로 돌아감
    if (slideIndex > slides.length) {
        slideIndex = 1
    }
    
    // 현재 인덱스에 해당하는 슬라이드만 보여줌
    slides[slideIndex-1].style.display = "block";  
    
    // 4초 뒤에 다시 showSlides 함수를 실행 (이미지 변경)
    setTimeout(showSlides, 4000); 
}