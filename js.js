let data = [];
let filteredData = [];
let currentPage = 1;
const itemsPerPage = 4;

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
   
    document.getElementById('menuToggle').addEventListener('click', toggleSidebar);
    document.querySelector('.dropdown > a').addEventListener('click', toggleSubmenu);
});

async function fetchData() {
    data = [
        { "product": "SmartTech Pro-4K Ultra HD TV", "price": "$1,542.99", "income": "$12.36k", "sales": "3,217", "view": "21,451", "click": "16,287", "clickPercentage": "39.56%", "status": "Active" },
        { "product": "InfinityGlow LED Desk Lamp", "price": "$324.77", "income": "$21.10k", "sales": "8,245", "view": "33,415", "click": "25,430", "clickPercentage": "91.43%", "status": "Inactive" },
        { "product": "PowerPulse Wireless Earbuds", "price": "$99.00", "income": "$374", "sales": "2,987", "view": "41,123", "click": "46,963", "clickPercentage": "79.21%", "status": "Active" },
        { "product": "WellnessWonders Yoga Mat", "price": "$324.77", "income": "$21.10k", "sales": "8,245", "view": "33,415", "click": "25,430", "clickPercentage": "91.43%", "status": "Inactive" },
        { "product": "SmartTech Pro-4K Ultra HD TV", "price": "$1,542.99", "income": "$12.36k", "sales": "3,217", "view": "21,451", "click": "16,287", "clickPercentage": "39.56%", "status": "Active" },
        { "product": "LED Desk Lamp", "price": "$324.77", "income": "$21.10k", "sales": "8,245", "view": "33,415", "click": "25,430", "clickPercentage": "91.43%", "status": "Inactive" },
        { "product": "Wireless Earbuds", "price": "$99.00", "income": "$374", "sales": "2,987", "view": "41,123", "click": "46,963", "clickPercentage": "79.21%", "status": "Active" },
        { "product": "Mat", "price": "$324.77", "income": "$21.10k", "sales": "8,245", "view": "33,415", "click": "25,430", "clickPercentage": "91.43%", "status": "Inactive" },
        { "product": "WellnessWonders Yoga Mat", "price": "$324.77", "income": "$21.10k", "sales": "8,245", "view": "33,415", "click": "25,430", "clickPercentage": "91.43%", "status": "Inactive" },
        { "product": "SmartTech Pro-4K Ultra HD TV", "price": "$1,542.99", "income": "$12.36k", "sales": "3,217", "view": "21,451", "click": "16,287", "clickPercentage": "39.56%", "status": "Active" },
        { "product": "LED Desk Lamp", "price": "$324.77", "income": "$21.10k", "sales": "8,245", "view": "33,415", "click": "25,430", "clickPercentage": "91.43%", "status": "Inactive" },
    ];
    filteredData = [...data];
    displayData();
}

function displayData() {
    const start = (currentPage - 1) * itemsPerPage;
   
    const end = start + itemsPerPage;
    const paginatedData = filteredData.slice(start, end);

    const tableBody = document.getElementById("product-list");
    tableBody.innerHTML = "";

    
    paginatedData.forEach(item => {
        const statusBadge = item.status === "Active" ? `
            <p style="color: #137D6D; background-color: #DDF7F0; border: 1px solid #DDF7F0; width: 80px; 
                      border-radius: 5px; padding: 4px; display: flex; align-items: center; gap: 5px; 
                      font-size: 12px; ">
                <span style="border: 2px solid #137D6D; color: #137D6D; border-radius: 50%; padding: 1px 5px;
                            font-size: 10px;">&#10003;</span> 
                Active
            </p>` 
        : `
            <p style="color: #E84C3D; background-color: #FEE8E6; border: 1px solid #FEE8E6; width: 90px; 
                      border-radius: 5px; padding: 4px; display: flex; align-items: center; gap: 5px; 
                      font-size: 12px;">
                <span style="border: 2px solid #E84C3D; color: #E84C3D; border-radius: 50%; padding: 1px 5px;
                            font-size: 10px;">&#10007;</span> 
                Inactive
            </p>`;

        const row = `
        <tr>
            <td><input type="checkbox" name=""></td>
            <td>${item.product}</td>
            <td>${item.price}</td>
            <td>${item.income}</td>
            <td>${item.sales}</td>
            <td>${item.view}</td>
            <td>${item.click}</td>
            <td>${item.clickPercentage}</td>
            <td>${statusBadge}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });

    updatePagination();
}

function updatePagination() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  
    const pageNumbers = document.getElementById('pageNumbers');
    let buttons = '';
    
    for (let i = 1; i <= totalPages; i++) {
        buttons += `<button class="page ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
    }
    
    pageNumbers.innerHTML = buttons;
  
    document.getElementById("resultsCount").innerText = 
        `Showing ${Math.min(currentPage * itemsPerPage, filteredData.length)} of ${filteredData.length} results`;
}

function toggleSidebar() {
   
    document.getElementById('sidebar').classList.toggle('active');
    document.querySelector('main').classList.toggle('active');
}

function toggleSubmenu(e) {
    e.preventDefault();
  
    const submenu = this.parentElement.querySelector('.submenu');
    submenu.classList.toggle('show');
}

function searchProducts() {
  
    const query = document.getElementById("searchInput").value.toLowerCase();
    filteredData = data.filter(item => 
        item.product.toLowerCase().includes(query)
    );
    currentPage = 1;
    displayData();
}

function prevPage() {
  
    if (currentPage > 1) {
        currentPage--;
        displayData();
    }
}

function nextPage() {
   
if (currentPage * itemsPerPage < filteredData.length) {
        currentPage++;
        displayData();
    }
}

function goToPage(page) {
    if (page > 0 && page <= Math.ceil(filteredData.length / itemsPerPage)) {
        currentPage = page;
        displayData();
    }
}
