document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').textContent = currentYear;

    const lastModifiedDate = document.lastModified;
    document.getElementById('lastModified').textContent = `Last modified: ${lastModifiedDate}`;

    loadTransactionsFromLocalStorage();
});


const homeLink = document.getElementById('home');
const transactionLink = document.getElementById('transaction');
const reportsLink = document.getElementById('reports');

function clearInfoBar() {
    const infoBar = document.querySelector(".info-bar");
    infoBar.innerHTML = "";
}

homeLink.addEventListener('click', (event) => {
    event.preventDefault();
    const transactions = loadTransactionsFromLocalStorage();
    createMainInfoCard(transactions);
    createInfoBar(transactions);
    createExpenseFillableForm();
});

transactionLink.addEventListener('click', (event) => {
    event.preventDefault();
    const transactions = loadTransactionsFromLocalStorage();
    createInfoBar(transactions);
    createTransactionInfoCard(transactions);
});

reportsLink.addEventListener('click', (event) => {
    event.preventDefault();
    const transactions = loadTransactionsFromLocalStorage();
    createReportsInfoCard(transactions);
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

        // const deleteButton = document.createElement('button');
        // deleteButton.textContent = '❌';
        // deleteButton.classList.add('delete');

        // deleteButton.addEventListener('click', () => {
        //     deleteTransaction(index);
        // })

        card.appendChild(date);
        card.appendChild(amount);
        card.appendChild(category);
        // card.appendChild(deleteButton);
        mainInfoBox.appendChild(card);

    });
}

// function deleteTransaction(index) {
//     let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

//     transactions.splice(index, 1);

//     localStorage.setItem('transactions', JSON.stringify(transactions));

//     loadTransactionsFromLocalStorage();
// }

function createInfoBar(transactions) {
    const infoBar = document.querySelector(".info-bar");
    infoBar.innerHTML = ""; // Clear previous content

    let totalExpenses = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    let totalAmount = document.createElement("p");
    totalAmount.textContent = `Total Expenses: $${totalExpenses.toFixed(2)}`;

    infoBar.appendChild(totalAmount);
}

function createTransactionInfoCard(transactions) {
    const mainInfoBox = document.querySelector(".main-info-box");
    mainInfoBox.innerHTML = "";

    const filterSection = document.createElement('section');
    filterSection.classList.add("filter-section");

    //start date
    const startDateLabel = document.createElement('label');
    startDateLabel.setAttribute('for', 'start-date');
    startDateLabel.textContent = 'Start Date: ';

    const startDateInput = document.createElement('input');
    startDateInput.setAttribute('type', 'date');
    startDateInput.setAttribute('id', 'start-date');

    //End Date
    const endDateLabel = document.createElement('label');
    endDateLabel.setAttribute('type', 'date');
    endDateLabel.textContent = 'End Date: ';

    const endDateInput = document.createElement('input');
    endDateInput.setAttribute('type', 'date');
    endDateInput.setAttribute('id', 'end-date');

    //Filter button
    const filterButton = document.createElement('button');
    filterButton.textContent = 'Filter By Date';
    filterButton.addEventListener('click', () => {
        clearTransactionList();
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);
        const filteredTransactions = filterTransactionsByDate(transactions, startDate, endDate);
        console.log('dates filtered');
        displayTransactions(filteredTransactions);
    });

    filterSection.appendChild(startDateLabel);
    filterSection.appendChild(startDateInput);
    filterSection.appendChild(endDateLabel);
    filterSection.appendChild(endDateInput);
    filterSection.appendChild(filterButton);
    mainInfoBox.appendChild(filterSection);

    const transactionListContainer = document.createElement('div');
    transactionListContainer.classList.add("transaction-list");
    mainInfoBox.appendChild(transactionListContainer);
}

//transaction filter by date
function filterTransactionsByDate(transactions, startDate, endDate) {
    return transactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= startDate && transactionDate <= endDate;
    });
}

function clearTransactionList() {
    const transactionListContainer = document.querySelector('.transaction-list');
    transactionListContainer.innerHTML = '';
}

//display transations
function displayTransactions(transactions) {

    const transactionListContainer = document.querySelector('.transaction-list');
    transactionListContainer.innerHTML = ''; // Clear previous list to avoid duplicates

    transactions.forEach(transaction => {
        let card = document.createElement('section');

        let date = document.createElement('p');
        date.textContent = `${transaction.date}`;

        let amount = document.createElement('p');
        amount.textContent = `$${transaction.amount.toFixed(2)}`;

        let category = document.createElement('p');
        category.textContent = `${transaction.category}`;

        card.appendChild(date);
        card.appendChild(amount);
        card.appendChild(category);
        transactionListContainer.appendChild(card);
    });
}

function createExpenseFillableForm() {
    const form = document.createElement('form');
    form.setAttribute('id', 'expense-form');
    form.setAttribute('action', '#');
    form.setAttribute('method', 'GET');

    //category label
    const categoryLabel = document.createElement('label');
    categoryLabel.setAttribute('for', 'expense-category');
    categoryLabel.textContent = 'Category: '

    //category input
    const categorySelect = document.createElement('select');
    categorySelect.setAttribute('name', 'subject');
    categorySelect.setAttribute('id', 'category');
    categorySelect.setAttribute('required', 'true');

    //default select
    const defaultOption = document.createElement('option')
    defaultOption.setAttribute('value', ' ');
    defaultOption.textContent = 'Select a Category';
    categorySelect.appendChild(defaultOption);

    const categories = ["Groceries", "Rent", "Entertainment", "Utilities", "Gas/Auto"];
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });

    //date label
    const expenseDateLabel = document.createElement('label');
    expenseDateLabel.setAttribute('for', 'expense-date');
    expenseDateLabel.textContent = 'Date of expense: ';

    //date input
    const expenseDateInput = document.createElement('input');
    expenseDateInput.setAttribute('type', 'date');
    expenseDateInput.setAttribute('id', 'expense-date');
    expenseDateInput.setAttribute('name', 'expensedate');
    expenseDateInput.setAttribute('required', 'true');

    //expense amount label
    const amountLabel = document.createElement('label');
    amountLabel.setAttribute('for', 'expense-amount');
    amountLabel.textContent = 'Expense Amount: ';

    //expense input
    const amountInput = document.createElement('input');
    amountInput.setAttribute('type', 'number');
    amountInput.setAttribute('id', 'expense-number');
    amountInput.setAttribute('name', 'expenseamount')
    amountInput.setAttribute('required', 'true');

    //submit button
    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.textContent = 'Post Expense';

    form.appendChild(categoryLabel);
    form.appendChild(categorySelect);
    form.appendChild(expenseDateLabel);
    form.appendChild(expenseDateInput);
    form.appendChild(amountLabel);
    form.appendChild(amountInput);
    form.appendChild(submitButton);

    const mainInfoBox = document.querySelector('.main-info-box');
    mainInfoBox.appendChild(form);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        addTransactionToLocalStorage(categorySelect.value, expenseDateInput.value, parseFloat(amountInput.value));
        loadTransactionsFromLocalStorage();
    });
}

function addTransactionToLocalStorage(category, date, amount) {
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    const newTransaction = {
        category: category,
        date: date,
        amount: amount
    };

    transactions.push(newTransaction);

    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function loadTransactionsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('transactions')) || [];
}


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