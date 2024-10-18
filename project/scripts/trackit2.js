document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').textContent = currentYear;

    const lastModifiedDate = document.lastModified;
    document.getElementById('lastModified').textContent = `Last modified: ${lastModifiedDate}`;
});

const transactions = [
    { amount: 50.75, date: '2024-10-15', category: 'Groceries' },
    { amount: 150.00, date: '2024-10-16', category: 'Rent' },
    { amount: 20.99, date: '2024-10-17', category: 'Entertainment' },
    { amount: 35.49, date: '2024-10-17', category: 'Utilities' }
];

const homeLink = document.getElementById('home');
const reportsLink = document.getElementById('reports');

function clearInfoBar() {
    const infoBar = document.querySelector(".info-bar");
    infoBar.innerHTML = "";
}

homeLink.addEventListener('click', (event) => {
    event.preventDefault();
    createMainInfoCard(transactions);
    createInfoBar(transactions);
});

reportsLink.addEventListener('click', (event) => {
    event.preventDefault();
    createReportsInfoCard(transactions);
    clearInfoBar();
});

// Home page card
function createMainInfoCard(transactions) {
    const mainInfoBox = document.querySelector(".main-info-box");
    mainInfoBox.innerHTML = ""; // Clear previous content

    transactions.forEach(transaction => {
        let card = document.createElement("section");

        let date = document.createElement("p");
        date.textContent = `${transaction.date}`;
        
        let amount = document.createElement("p");
        amount.textContent = `$${transaction.amount.toFixed(2)}`;

        let category = document.createElement("p");
        category.textContent = `${transaction.category}`;

        card.appendChild(date);
        card.appendChild(amount);
        card.appendChild(category);
        mainInfoBox.appendChild(card);
    });
}

function createInfoBar(transactions) {
    const infoBar = document.querySelector(".info-bar");
    infoBar.innerHTML = ""; // Clear previous content

    let totalExpenses = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    let totalAmount = document.createElement("p");
    totalAmount.textContent = `Total Expenses: $${totalExpenses.toFixed(2)}`;

    infoBar.appendChild(totalAmount);
}

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

// Reports info card
function createReportsInfoCard(transactions) {
    const mainInfoBox = document.querySelector(".main-info-box");
    mainInfoBox.innerHTML = ""; // Clear previous content

    let chartSection = document.createElement("section");
    chartSection.classList.add("chart-container");
    let chartTitle = document.createElement("h4");
    chartTitle.textContent = "Spending Chart";
    chartSection.appendChild(chartTitle);
    mainInfoBox.appendChild(chartSection);

    let chartCanvas = document.createElement("canvas");
    chartCanvas.id = "spendingChart";
    chartSection.appendChild(chartCanvas);
    
    mainInfoBox.appendChild(chartSection);

    renderBarChart(transactions);

    // Time period dropdown
    let timePeriodHeading = document.createElement("h3");
    timePeriodHeading.textContent = "Time Period: ";
    let timePeriodDropDown = document.createElement("select");
    months.forEach(month => {
        let option = document.createElement("option");
        option.value = month;
        option.textContent = month;
        timePeriodDropDown.appendChild(option);
    });

    mainInfoBox.appendChild(timePeriodHeading);
    mainInfoBox.appendChild(timePeriodDropDown);

    // Expense Summary
    let summaryHeading = document.createElement("h3");
    summaryHeading.textContent = "Expense Summary";
    mainInfoBox.appendChild(summaryHeading);
    
    let totalExpenses = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    let averageDaily = totalExpenses / 30;

    let totalText = document.createElement("p");
    totalText.textContent = `Total Expenses: $${totalExpenses.toFixed(2)}`;

    let averageText = document.createElement("p");
    averageText.textContent = `Average Daily Spending: $${averageDaily.toFixed(2)}`;

    mainInfoBox.appendChild(totalText);
    mainInfoBox.appendChild(averageText);
}

function sumCategories(transactions) {
    let categoryTotals = {};

    transactions.forEach(transaction => {
        if (categoryTotals[transaction.category]) {
            categoryTotals[transaction.category] += transaction.amount;
        } else {
            categoryTotals[transaction.category] = transaction.amount;
        }
    });

    return Object.keys(categoryTotals).map(category => {
        return {
            category: category,
            total: categoryTotals[category]
        };
    });
}

function renderBarChart(transactions) {
    const ctx = document.getElementById('spendingChart').getContext('2d');

    // Group transactions by category and sum the amounts
    const categoryData = sumCategories(transactions);
    
    const categories = categoryData.map(item => item.category);
    const amounts = categoryData.map(item => item.total);

    // Create the bar chart
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categories, // Transaction categories
            datasets: [{
                label: 'Spending per Category',
                data: amounts, // Total spending in each category
                backgroundColor: 'rgba(139, 140, 74, 0.6)', // Olive green
                borderColor: 'rgba(139, 140, 74, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Amount ($)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Category'
                    }
                }
            }
        }
    });
}