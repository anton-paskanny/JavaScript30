document.addEventListener('DOMContentLoaded', () => {
    /**
     * Internal variables
     */
    const player = document.querySelector('.player');
    const video = player.querySelector('.player__video');
    const progress = player.querySelector('.progress');
    const progressBar = progress.querySelector('.progress__filled');
    const toggleBtn = player.querySelector('.toggle');
    const skipBtns = player.querySelectorAll('button[data-skip]');
    const ranges = player.querySelectorAll('.player__slider');
    const fullScreenBtn = player.querySelector('.player__button--fullscreen');
    const timeIndicatorCurrent = player.querySelector('.time-indicator__current');
    const timeIndicatorDuration = player.querySelector('.time-indicator__duration');
    let isRangeClicked = false;
    let mousedownProgress = false;

    /**
     * Internal functions
     */
    function togglePlay() {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }

    function updateBtn() {
        const icon = this.paused ? '►' : '❚ ❚';
        toggleBtn.textContent = icon;
    }

    function skip() {
        video.currentTime += parseFloat(this.dataset.skip);
    }

    function handleIndicatorUpdate() {
        const min = parseInt(video.currentTime / 60, 10);
        const sec = parseInt(video.currentTime % 60);
        timeIndicatorCurrent.textContent = `${min}:${sec < 10 ? "0" + sec : sec}`;
    }

    function handleRangeUpdate() {
        // this.name can be either 'playbackRate' or 'volume'.
        if (isRangeClicked) {
            video[this.name] = this.value;
        }
    }

    function handlePorgress() {
        const percent = (video.currentTime / video.duration) * 100;
        progressBar.style.flexBasis = `${percent}%`;
        handleIndicatorUpdate();
    }

    function handleDurationChange() {
        const min = parseInt(video.duration / 60, 10);
        const sec = parseInt(video.duration % 60);
        timeIndicatorCurrent.textContent = '0:00';
        timeIndicatorDuration.textContent = `${min}:${sec}`;
    }

    function scrub(e) {
        const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
        video.currentTime = scrubTime;
    }

    /**
     * Events
     */
    toggleBtn.addEventListener('click', togglePlay);
    video.addEventListener('click', togglePlay);
    video.addEventListener('play', updateBtn);
    video.addEventListener('pause', updateBtn);
    video.addEventListener('timeupdate', handlePorgress);
    video.addEventListener('durationchange', handleDurationChange);
    skipBtns.forEach(btn => btn.addEventListener('click', skip));
    ranges.forEach(range => {
        range.addEventListener('change', handleRangeUpdate);
        range.addEventListener('mousemove', handleRangeUpdate);
        range.addEventListener('mousedown', () => isProgressBarClicked = true);
        range.addEventListener('mouseup', () => isRangeClicked = false);
        range.addEventListener('mouseout', () => isRangeClicked = false);
    });
    progress.addEventListener('click', scrub);
    progress.addEventListener('mousemove', (e) => mousedownProgress && scrub(e));
    progress.addEventListener('mousedown', () => mousedownProgress = true);
    progress.addEventListener('mouseup', () => mousedownProgress = false);
    progress.addEventListener('mouseout', () => mousedownProgress = false);
    fullScreenBtn.addEventListener('click', () => video.webkitRequestFullScreen());
});