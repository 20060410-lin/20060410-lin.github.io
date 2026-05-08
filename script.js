document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            sections.forEach(section => section.classList.remove('active'));
            targetSection.classList.add('active');
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    const audioBtn = document.getElementById('audio-btn');
    const audio = document.getElementById('international-audio');
    const progressBar = document.querySelector('.progress-bar');
    const progress = document.querySelector('.progress');
    const currentTimeEl = document.querySelector('.current-time');
    const durationEl = document.querySelector('.duration');

    if (audioBtn && audio) {
        audioBtn.addEventListener('click', function() {
            if (audio.paused) {
                audio.play();
                audioBtn.classList.add('playing');
            } else {
                audio.pause();
                audioBtn.classList.remove('playing');
            }
        });

        audio.addEventListener('loadedmetadata', function() {
            durationEl.textContent = formatTime(audio.duration);
        });

        audio.addEventListener('timeupdate', function() {
            const progressPercent = (audio.currentTime / audio.duration) * 100;
            progress.style.width = progressPercent + '%';
            currentTimeEl.textContent = formatTime(audio.currentTime);
        });

        audio.addEventListener('ended', function() {
            audioBtn.classList.remove('playing');
            progress.style.width = '0%';
            currentTimeEl.textContent = '0:00';
        });

        progressBar.addEventListener('click', function(e) {
            const rect = progressBar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            audio.currentTime = percent * audio.duration;
        });
    }

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);
    }
});