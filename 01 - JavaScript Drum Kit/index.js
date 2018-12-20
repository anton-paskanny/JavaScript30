document.addEventListener('DOMContentLoaded', e => {
    // Internal variabels
    const KEYS = document.querySelectorAll(".key");
    const TRANSITION_CLASS = 'playing';
    

    // Event listeners
    /**
     * Window event listener to detect which key was pressed
     * @param {object} e - event object
     */
    function onKeyDown(e) {
        const keyCode = e.keyCode;
        const queryAudioStr = `audio[data-key="${keyCode}"]`;
        const queryKeyStr = `.keys div[data-key="${keyCode}"]`;

        const audio = document.querySelector(queryAudioStr);
        const keyElem = document.querySelector(queryKeyStr);

        if (!audio) return;

        // Reset time to allow sounding on multiple keypress
        audio.currentTime = 0;
        audio.play();

        keyElem.classList.add(TRANSITION_CLASS);
    }

    /**
     * Transition end listener for UI keys to remove transition's class and set styles to default
     * @param {object} e - event object
     */
    function onTransitionEnd(e) {
        // Transition is set to 'all' in styles. We don't need to invoke 'remove' method on each property transition end.
        if (e.propertyName !== 'transform') return;
        this.classList.remove(TRANSITION_CLASS)
    }


    //Initialization
    KEYS.forEach(key => key.addEventListener('transitionend', onTransitionEnd));
    window.addEventListener('keydown', onKeyDown);
});
