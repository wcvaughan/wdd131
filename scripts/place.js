document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').textContent = currentYear;

    const lastModifiedDate = document.lastModified;
    document.getElementById('lastModified').textContent = `Last modified: ${lastModifiedDate}`;
});


document.addEventListener('DOMContentLoaded', function () {
    const temperature = 48;
    const windSpeed = 16;

    function calculateWindChill(temp, windSpeed) {
        return (
            35.74 +
            0.6215 * temp -
            35.75 * Math.pow(windSpeed, 0.16)
        ).toFixed(1);
    }

    function displayWindchill() {
        let windChill = 'N/A';
        if (temperature <= 50 && windSpeed > 3) {
            windChill = calculateWindChill(temperature, windSpeed) + " °F"
        }
        document.querySelector('.windchill').textContent = `Wind Chill: ${windChill}`;
    }

    displayWindchill();
}); 