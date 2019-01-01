document.addEventListener('DOMContentLoaded', e => {
   const inbox = document.querySelector('.inbox');
   const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');

   let firstCheckbox;
   let inBetween = false;

   function handleClick(e) {
    if (e.target.tagName !== 'INPUT') return;

    const target = e.target;
    const bothAreChecked = firstCheckbox && firstCheckbox.checked && target.checked;

    // Start looping through checkboxes only if shift is pressed and checkbox is checked.
    if (e.shiftKey && bothAreChecked && (target !== firstCheckbox)) {

        // Loop over every single checkbox
        checkboxes.forEach(checkbox => {
            
            // Find those checkboxes which are between checked ones.
            // Usually "target" here is the checkbox checked with shift key.
            // Checking must work in two directions: from up to down and vice versa.
            if (checkbox === target || checkbox === firstCheckbox) {
                inBetween = !inBetween;
            }

            if (inBetween) {
                if (!checkbox.checked) {
                    checkbox.checked = true;
                }
            }
        });
    }

    firstCheckbox = target;
   }

   inbox.addEventListener('click', handleClick);
});