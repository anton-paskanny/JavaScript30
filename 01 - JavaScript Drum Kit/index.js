document.addEventListener('DOMContentLoaded', e => {
    // Internal variabels
    const KEYS_WRAPPER = document.querySelector(".keys");
    const KEYS = document.querySelectorAll(".key");
    const TRANSITION_CLASS = 'playing';


    // Internal functions
    function playAudio(keyCode) {
        const queryAudioStr = `audio[data-key="${keyCode}"]`;
        const audio = document.querySelector(queryAudioStr);

        if (!audio) return;

        // Reset time to allow sounding on multiple keypress
        audio.currentTime = 0;
        audio.play();
    }
    

    // Event listeners

    /**
     * Window event listener to detect which key was pressed
     * @param {object} e - event object
     */
    function onKeyDown(e) {
        const queryKeyStr = `.keys div[data-key="${e.keyCode}"]`;
        const keyElem = document.querySelector(queryKeyStr);

        playAudio(e.keyCode);

        keyElem && keyElem.classList.add(TRANSITION_CLASS);
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

    /**
     * Click event listener on keys to allow sounding by click
     * @param {object} e - event object
     */
    function onKeysWrapperClick(e) {
        let target = e.target;

        if (target.classList.contains('keys')) return;

        while (target) {
            if (target.classList.contains('key')) {
                playAudio(target.dataset.key);
                target.classList.add(TRANSITION_CLASS);
                return;
            }

            target = target.parentNode;
        }
    }

    KEYS.forEach(key => key.addEventListener('transitionend', onTransitionEnd));
    KEYS_WRAPPER.addEventListener('click', onKeysWrapperClick);
    window.addEventListener('keydown', onKeyDown);
});
