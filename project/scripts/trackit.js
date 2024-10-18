document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').textContent = currentYear;

    const lastModifiedDate = document.lastModified;
    document.getElementById('lastModified').textContent = `Last modified: ${lastModifiedDate}`;
});

const transactions = [
    {
      amount: 50.75,
      date: '2024-10-15',
      category: 'Groceries'
    },
    {
      amount: 150.00,
      date: '2024-10-16',
      category: 'Rent'
    },
    {
      amount: 20.99,
      date: '2024-10-17',
      category: 'Entertainment'
    },
    {
      amount: 35.49,
      date: '2024-10-17',
      category: 'Utilities'
    }
  ];

const homeLink = document.getElementById('home');
const categoriesLink = document.getElementById('categories');
const reportsLink = document.getElementById('reports');
const settingsLink = document.getElementById('settings');

homeLink.addEventListener('click', (event) => {
    event.preventDefault();
    createMainInfoCard(transactions);
    createInfoBar();
});

categoriesLink.addEventListener('click', (event) => {
    event.preventDefault();
    createCategoryInfoCard();
    clearInfoBar();
    createCategoryBar();
})


reportsLink.addEventListener('click', (event) => {
    event.preventDefault();
    createReportsInfoCard(transactions);
    clearInfoBar();
})

settingsLink.addEventListener('click', (event) => {
    event.preventDefault();
    createSettingsInfoCard();
    clearInfoBar();
})

//Home page card
function createMainInfoCard(transactions) {
    const mainInfoBox = document.querySelector(".main-info-box");
    mainInfoBox.innerHTML = "";

    transactions.forEach(transaction => {
        let card = document.createElement("section");

        let amount = document.createElement("p");
        amount.classList.add("transaction-amount");
        amount.textContent = `Amount: $${transaction.amount.toFixed(2)}`;

        let date = document.createElement("p");
        date.classList.add("transaction-date");
        date.textContent = `Date: ${transaction.date}`;
        
        let category = document.createElement("p");
        category.classList.add("transaction-category");
        category.textContent = `Category: ${transaction.category}`;
        
        card.appendChild(amount);
        card.appendChild(date);
        card.appendChild(category);

        mainInfoBox.appendChild(card);       
    });
}

function clearInfoBar() {
    const infoBar = document.querySelector(".info-bar");
    infoBar.innerHTML = "";
}

function createInfoBar() {
    const infoBar = document.querySelector(".info-bar");
    infoBar.innerHTML = ""; // Clear previous content

    let totalAmount = document.createElement("p");

    // Get the total expenses
    let totalExpenses = sumTransactions(transactions);

    totalAmount.textContent = `Total Expenses: $${totalExpenses.toFixed(2)}`;

    // Append total amount to the info bar
    infoBar.appendChild(totalAmount);
}

//Category info card
function createCategoryInfoCard(transactions) {
    const mainInfoBox = document.querySelector(".main-info-box");
    mainInfoBox.innerHTML = "";

    const catInfoBox = document.createElement("div");
    catInfoBox.classList.add("category-info-box")

    let table = document.createElement("div");
    table.classList.add("category-table");

    // Header Row
    let headerRow = document.createElement("div");
    headerRow.classList.add("category-row", "header");

    let categoryHeader = document.createElement("div");
    categoryHeader.textContent = "Category";
    let totalHeader = document.createElement("div");
    totalHeader.textContent = "Total Spent";

    headerRow.appendChild(categoryHeader);
    headerRow.appendChild(totalHeader);
    table.appendChild(headerRow);

    // Categories and totals row
    const categoryTotals = sumCategories(transactions);

    categoryTotals.forEach(categoryTotal => {
        let card = document.createElement("section")
        card.classList.add("category-info-box")

        let row = document.createElement("div");
        row.classList.add("category-row");

        let categoryName = document.createElement("div");
        categoryName.classList.add("category-name");
        categoryName.textContent = categoryTotal.category;

        let total = document.createElement("div");
        total.classList.add("category-total");
        total.textContent = `$${categoryTotal.total.toFixed(2)}`;

        // Add Edit/Delete Buttons
        let editDeleteDiv = document.createElement("div");
        editDeleteDiv.classList.add("edit-delete-btn");

        let editBtn = document.createElement("button");
        editBtn.classList.add("edit")
        editBtn.textContent = "Edit";

        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete");
        deleteBtn.textContent = "Delete";

        editDeleteDiv.appendChild(editBtn);
        editDeleteDiv.appendChild(deleteBtn);

        // Append buttons and details to the row
        row.appendChild(category);
        row.appendChild(total);
        row.appendChild(editDeleteDiv);
    });

    catInfoBox.appendChild(card);

    catInfoBox.appendChild(table);
    mainInfoBox.appendChild(catInfoBox);

}

function createCategoryBar() {
    const infoBar = document.querySelector(".info-bar");
    infoBar.innerHTML = ""; // Clear previous content
    //A button that allows user to add a category
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
//Reports info card
function createReportsInfoCard(transactions) {
    const mainInfoBox = document.querySelector(".main-info-box");
    mainInfoBox.innerHTML = "";

    let chartSection = document.createElement("section");
    chartSection.classList.add("chart-container");

    let chartTitle = document.createElement("h4");
    chartTitle.textContent = "Spending Chart";
    chartSection.appendChild(chartTitle);
    
    // Append canvas or chart elements here if you're using a charting library
    let chartCanvas = document.createElement("div");
    chartCanvas.textContent = "[Chart goes here]"; // Placeholder
    chartSection.appendChild(chartCanvas);

    mainInfoBox.appendChild(chartSection);

    
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

    let totalExpenses = sumTransactions(transactions);
    let averageDaily = totalExpenses / 30; //rounded out for a month
    let largestCategory = "Rent"; // Example

    let totalText = document.createElement("p");
    totalText.textContent = `Total Expenses: $${totalExpenses.toFixed(2)}`;

    let averageText = document.createElement("p");
    averageText.textContent = `Average Daily Spending: $${averageDaily.toFixed(2)}`;

    let largestText = document.createElement("p");
    largestText.textContent = `Largest Category: ${largestCategory}`;

    mainInfoBox.appendChild(totalText);
    mainInfoBox.appendChild(averageText);
    mainInfoBox.appendChild(largestText);
}

//Settings info card
function createSettingsInfoCard() {
    const mainInfoBox = document.querySelector(".main-info-box");
    mainInfoBox.innerHTML = "";

    // Account Settings
    let accountSettingsHeader = document.createElement("h3");
    accountSettingsHeader.textContent = "Account Settings";
    let profileInfo = document.createElement("p");
    profileInfo.textContent = "Profile Info";
    let changePassword = document.createElement("p");
    changePassword.textContent = "Change Password";

    // Budget Settings
    let budgetSettingsHeader = document.createElement("h3");
    budgetSettingsHeader.textContent = "Budget Settings";
    let setMonthlyBudget = document.createElement("p");
    setMonthlyBudget.textContent = "Set Monthly Budget";
    let resetBudgets = document.createElement("p");
    resetBudgets.textContent = "Reset Budgets";

    // App Settings
    let appSettingsHeader = document.createElement("h3");
    appSettingsHeader.textContent = "App Settings";
    let themeToggle = document.createElement("p");
    themeToggle.textContent = "Theme: [Light/Dark Toggle]";
    let notificationsToggle = document.createElement("p");
    notificationsToggle.textContent = "Notifications: [On/Off Toggle]";

    // Data and Backup
    let dataBackupHeading = document.createElement("h3");
    dataBackupHeading.textContent = "Data & Backup";
    let exportData = document.createElement("p");
    exportData.textContent = "Export Data";
    let importData = document.createElement("p");
    importData.textContent = "Import Data";

    // Append to mainInfoBox
    mainInfoBox.appendChild(accountSettingsHeading);
    mainInfoBox.appendChild(profileInfo);
    mainInfoBox.appendChild(changePassword);
    mainInfoBox.appendChild(budgetSettingsHeading);
    mainInfoBox.appendChild(setMonthlyBudget);
    mainInfoBox.appendChild(resetBudgets);
    mainInfoBox.appendChild(appSettingsHeading);
    mainInfoBox.appendChild(themeToggle);
    mainInfoBox.appendChild(notificationsToggle);
    mainInfoBox.appendChild(dataBackupHeading);
    mainInfoBox.appendChild(exportData);
    mainInfoBox.appendChild(importData);
}

function sumTransactions(transactions) {
    let total = 0;
    transactions.forEach(transaction => {
        total += transaction.amount;
    });
    return total;
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

    // Convert to array of objects
    return Object.keys(categoryTotals).map(category => {
        return {
            category: category,
            total: categoryTotals[category]
        };
    });
}
