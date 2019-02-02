document.addEventListener('DOMContentLoaded', e => {
    const addItemsForm = document.querySelector(".add-items");
    const itemName = addItemsForm.querySelector('[name=item]');
    const itemsList = document.querySelector(".plates");
    const localStorageKey = 'items';
    const itemsArr = JSON.parse(localStorage.getItem(localStorageKey)) || [];

    function addItem(e) {
        e.preventDefault();
      
        const item = {
            text: itemName.value,
            done: false
        }

        itemsArr.push(item);

        populateList(itemsArr, itemsList);

        localStorage.setItem(localStorageKey, JSON.stringify(itemsArr));

        this.reset();
    }

    function toggleDone(e) {
        if (e.target.tagName !== 'INPUT') return;

        const index = e.target.dataset['index'];

        itemsArr[index].done = !itemsArr[index].done;
        localStorage.setItem(localStorageKey, JSON.stringify(itemsArr));
    }

    function populateList(plates = [], platesList) {
        platesList.innerHTML = plates.map((plate, i) => {
            return `
                <li>
                    <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''}/>
                    <label for="item${i}">${plate.text}</label>
                </li>
            `;
        }).join('');
    }

    addItemsForm.addEventListener('submit', addItem);
    itemsList.addEventListener('click', toggleDone);

    populateList(itemsArr, itemsList);
});