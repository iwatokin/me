const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play');
const pauseBtn = document.getElementById('pause');
const stopBtn = document.getElementById('stop');
const seekBar = document.getElementById('seek-bar');

let isDragging = false;
let wasPlaying = false; // Mengingat apakah lagu sedang berjalan sebelum slider diklik

playBtn.addEventListener('click', () => audio.play());
pauseBtn.addEventListener('click', () => audio.pause());

stopBtn.addEventListener('click', () => {
    audio.pause();
    audio.currentTime = 0;
});

audio.addEventListener('loadedmetadata', () => {
    seekBar.max = audio.duration;
});

// Bar berjalan otomatis
audio.addEventListener('timeupdate', () => {
    if (!isDragging) {
        seekBar.value = audio.currentTime;
    }
});

// --- LOGIKA KLIK & TARIK SLIDER YANG SEMPURNA ---

// 1. Saat slider mulai ditekan/diklik
seekBar.addEventListener('mousedown', () => {
    isDragging = true;
    wasPlaying = !audio.paused; // Cek apakah lagu sedang dimainkan
    audio.pause(); // Jeda sejenak agar tidak error
});

// 2. Saat slider digeser atau diklik di titik tertentu
seekBar.addEventListener('input', () => {
    audio.currentTime = parseFloat(seekBar.value);
});

// 3. Saat klik/jari dilepas dari slider
seekBar.addEventListener('mouseup', () => {
    isDragging = false;
    if (wasPlaying) {
        audio.play(); // Lanjutkan lagu jika sebelumnya sedang dimainkan
    }
});

// Untuk dukungan layar sentuh (HP)
seekBar.addEventListener('touchstart', () => {
    isDragging = true;
    wasPlaying = !audio.paused;
    audio.pause();
});
seekBar.addEventListener('touchend', () => {
    isDragging = false;
    if (wasPlaying) audio.play();
});
