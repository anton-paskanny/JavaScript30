document.addEventListener('DOMContentLoaded', e => {
    const hourArrow = document.querySelector(".hour-hand");
    const minArrow = document.querySelector(".min-hand");
    const secArrow = document.querySelector(".second-hand");

    /**
     * Function to update current time for css clock
     */
    function setDate() {
        const currDate = new Date();

        const seconds = currDate.getSeconds();
        const secondsDegree = ((seconds / 60) * 360) + 90;
        secArrow.style.transform = `rotate(${secondsDegree}deg`;

        const min = currDate.getMinutes();
        const minDegree = ((min / 60) * 360) + ((seconds / 60) * 6) + 90;
        minArrow.style.transform = `rotate(${minDegree}deg`;

        const hours = currDate.getHours();
        const hoursDegree = ((hours / 12) * 360) + ((min / 60) * 30) + 90;
        hourArrow.style.transform = `rotate(${hoursDegree}deg`;
    }

    setInterval(setDate, 1000);
});