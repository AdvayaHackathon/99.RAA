const heartSvg = document.getElementById('heart-svg');
const beatButton = document.getElementById('beatButton');
let isBeating = false;

function toggleBeat() {
    if (isBeating) {
        heartSvg.classList.remove('beating');
        beatButton.textContent = 'Make Heart Beat';
    } else {
        heartSvg.classList.add('beating');
        beatButton.textContent = 'Stop Beating';
    }
    isBeating = !isBeating;
}

// Make the heart beat when the button is clicked
beatButton.addEventListener('click', toggleBeat);

// Optional: Add hover effect to slightly scale the heart
heartSvg.addEventListener('mouseenter', () => {
    if (!isBeating) { // Only apply hover scale if not already beating
       heartSvg.style.transform = 'scale(1.05)';
    }
});

heartSvg.addEventListener('mouseleave', () => {
    if (!isBeating) { // Reset scale on mouse leave if not beating
       heartSvg.style.transform = 'scale(1)';
    }
});