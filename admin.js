const tableBody = document.getElementById("tableBody");

// Fetch data
async function fetchData() {
const res = await fetch("http://localhost:5000/api/form");
const data = await res.json();

tableBody.innerHTML = "";

data.forEach(item => {
    const row = `
    <tr>
        <td>${item.name}</td>
        <td>${item.email}</td>
        <td>${item.phone}</td>
        <td>${item.person}</td>
        <td>${item.month}</td>
        <td>
        <button onclick="deleteData('${item._id}')">Delete</button>
        </td>
    </tr>
    `;
    tableBody.innerHTML += row;
});
}

// Delete data
async function deleteData(id) {
await fetch(`http://localhost:5000/api/form/${id}`, {
    method: "DELETE",
});

fetchData();
}

// Load data
fetchData();