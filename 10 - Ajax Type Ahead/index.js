document.addEventListener('DOMContentLoaded', e => {
    const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
    const searchInput = document.querySelector('.search');
    const suggestions = document.querySelector('.suggestions');
    const cities = [];
    const delay = 150;
    let timer;

    fetch(endpoint)
        .then(res => res.json())
        .then(data => cities.push(...data))

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function findMatches(wordToMatch, cities) {
        const regex = new RegExp(wordToMatch, 'gi');
        return cities.filter(place => {
            return place.city.match(regex) || place.state.match(regex);
        });
    }

    function renderList(array, wordToMatch) {
        return array.map(place => {
            const regexp = new RegExp(wordToMatch, 'gi');
            const cityName = place.city.replace(regexp, `<span class="hl">${wordToMatch}</span>`);
            const stateName = place.state.replace(regexp, `<span class="hl">${wordToMatch}</span>`);

            return `
                <li>
                <span class="name">${cityName}, ${stateName}</span>
                <span class="population">${numberWithCommas(place.population)}</span>
                </li>
            `;
        }).join('');
    }

    function displayMatches() {
        const matchArray = findMatches(this.value, cities);
        const html = renderList(matchArray, this.value); 
        suggestions.innerHTML = html;
    }

    function debounce(fn) {
        return function() {
            const context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(context, args);
                timer = null;
            }, delay);
        }
    }

    searchInput.addEventListener('keyup', debounce(displayMatches));
})