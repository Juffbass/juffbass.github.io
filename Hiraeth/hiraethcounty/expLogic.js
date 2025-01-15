const songAudio = document.getElementById('song-audio');
const videoBackground = document.getElementById('video-background');
const overlay = document.getElementById('overlay');
const playPauseButton = document.getElementById('play-pause');
const backwardButton = document.getElementById('backward');
const forwardButton = document.getElementById('forward');
const controlsContainer = document.getElementById('controls-container');
const progressBar = document.getElementById('progress-bar');
const ambientAudio = document.getElementById('ambient-audio');
let overlayGone = false;
let isPlaying = false;
let songEnded = false;

playPauseButton.innerHTML = isPlaying ? '<img src="../images/pause.png" alt="Pause">' : '<img src="../images/play.png" alt="Play">';
backwardButton.innerHTML = '<img src="../images/back.png" alt="Backward">';
forwardButton.innerHTML = '<img src="../images/next.png" alt="Forward">';
songAudio.volume = 0.7;
ambientAudio.volume = 0.5;

// overlay
document.body.classList.add('overlay-visible');
document.getElementById('back-to-map').style.display = 'none';
controlsContainer.style.display = 'none';

overlay.addEventListener('click', () => {
    videoBackground.play();
    videoBackground.style.filter = 'none';
    songAudio.muted = false;
    songAudio.play().catch(error => {
        console.log('Autoplay was prevented:', error);
    });
    ambientAudio.muted = false;
    ambientAudio.play().catch(error => {
        console.log('Autoplay was prevented:', error);
    });
    overlay.style.display = 'none';
    overlayGone = true;
    document.body.classList.remove('overlay-visible');
    document.getElementById('back-to-map').style.display = 'block';
    controlsContainer.style.display = 'block';
});

// buttons function
playPauseButton.addEventListener('click', () => {
    if (songEnded) {
        location.reload();
    } else {
        if (isPlaying) {
            songAudio.pause();
            videoBackground.pause();
            ambientAudio.pause();
            playPauseButton.innerHTML = '<img src="../images/play.png" alt="Play">';
        } else {
            songAudio.play();
            videoBackground.play();
            ambientAudio.play();
            playPauseButton.innerHTML = '<img src="../images/pause.png" alt="Pause">';
        }
        isPlaying = !isPlaying;
    }
});

backwardButton.addEventListener('click', () => {
    songAudio.currentTime = Math.max(0, songAudio.currentTime - 10);
    videoBackground.currentTime = songAudio.currentTime;
    ambientAudio.currentTime = songAudio.currentTime;
});

forwardButton.addEventListener('click', () => {
    songAudio.currentTime = Math.min(songAudio.duration, songAudio.currentTime + 10);
    videoBackground.currentTime = songAudio.currentTime;
    ambientAudio.currentTime = songAudio.currentTime;
});

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault();
        playPauseButton.click();
    }
});

songAudio.addEventListener('timeupdate', () => {
    const progress = (songAudio.currentTime / songAudio.duration) * 100;
    progressBar.style.width = progress + '%';
});

ambientAudio.loop = true;

window.addEventListener('resize', () => {
    videoBackground.style.objectFit = window.innerWidth > window.innerHeight ? 'cover' : 'contain';
});
