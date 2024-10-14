document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').textContent = currentYear;

    const lastModifiedDate = document.lastModified;
    document.getElementById('lastModified').textContent = `Last modified: ${lastModifiedDate}`;

    let visitCount = localStorage.getItem('visitCount');

    if (visitCount === null) {
        visitCount = 0;
    }

    document.getElementById('counter').textContent = visitCount;

});


