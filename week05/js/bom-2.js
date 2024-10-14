const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

let chaptersArray = getChapterList() || [];

chaptersArray.forEach(chapter => {
    displayList(chapter);
});

button.addEventListener('click', () => {
    if (input.value.trim() !== '') {
        displayList(input.value);
        chaptersArray.push(input.value);
        setChapterList();
        input.value = '';
        input.focus();
    }
});

function displayList(item) {
    const li = document.createElement('li');
    const deleteButton = document.createElement('button');

    // Set the text content for the chapter and delete button
    li.textContent = item;
    deleteButton.textContent = '❌';
    deleteButton.classList.add('delete');
    // Append the delete button to the list item (li)
    li.append(deleteButton);

    // Append the list item to the unordered list (ul)
    list.append(li);

    deleteButton.addEventListener('click', function () {
        list.removeChild(li);
        deleteChapter(li.textContent);
        input.focus();
    });
};

function setChapterList() {
    localStorage.setItem('myBOMList', JSON.stringify(chaptersArray));
};

function getChapterList() {
    return JSON.parse(localStorage.getItem('myBOMList'));
};

function deleteChapter(chapter) {
    chapter = chapter.slice(0, chapter.length - 1);
    chaptersArray = chaptersArray.filter((item) => item !== chapter);
    setChapterList();
};