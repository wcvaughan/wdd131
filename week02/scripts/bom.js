const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

button.addEventListener('click', () => {
    if (input.value.trim() !== '') {
        const li = document.createElement('li');
        const deleteButton = document.createElement('button');

        // Set the text content for the chapter and delete button
        li.textContent = input.value;
        deleteButton.textContent = '❌';

        // Append the delete button to the list item (li)
        li.append(deleteButton);

        // Append the list item to the unordered list (ul)
        list.append(li);

        // Clear the input field and focus back on it
        input.value = '';
        input.focus();

        // Add event listener to delete button to remove the item
        deleteButton.addEventListener('click', () => {
            list.removeChild(li);
        });
    }

});