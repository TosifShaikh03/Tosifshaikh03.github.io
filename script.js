// Load cheques from localStorage or initialize empty array
let cheques = JSON.parse(localStorage.getItem('cheques')) || [];

// Function to save cheques to localStorage
function saveCheques() {
    localStorage.setItem('cheques', JSON.stringify(cheques));
}

// Function to calculate status based on date to pass
function getStatus(dateToPass) {
    const today = new Date();
    const passDate = new Date(dateToPass);

    if (today.toDateString() === passDate.toDateString()) {
        return { text: 'Due Today', class: 'status-overdue' };
    }
    else if (today > passDate) {
        return { text: 'Passed', class: 'status-passed' };
    }
    else (today.toDateString() < passDate.toDateString()); {
        return { text: 'Pending', class: 'status-pending' };
    }

}

// Function to render the cheque table
function renderTable() {
    const tableBody = document.getElementById('chequeTableBody');
    tableBody.innerHTML = '';

    cheques.forEach((cheque, index) => {
        const status = getStatus(cheque.dateToPass);
        const row = document.createElement('tr');
        row.innerHTML = `
                   <td>${cheque.recipient}</td>
                   <td>${cheque.dateGiven}</td>
                   <td>${cheque.dateToPass}</td>
                   <td class="${status.class}">${status.text}</td>
                   <td><button class="delete-btn" onclick="deleteCheque(${index})">Delete</button></td>
               `;
        tableBody.appendChild(row);
    });
}

// Function to add a new cheque
document.getElementById('chequeForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const recipient = document.getElementById('recipient').value;
    const dateGiven = document.getElementById('dateGiven').value;
    const dateToPass = document.getElementById('dateToPass').value;



    cheques.push({ recipient, dateGiven, dateToPass });
    saveCheques();
    renderTable();

    // Reset form
    document.getElementById('chequeForm').reset();
});

// Function to delete a cheque
window.deleteCheque = function (index) {
    if (confirm('Are you sure you want to delete this cheque?')) {
        cheques.splice(index, 1);
        saveCheques();
        renderTable();
    }
};

// Initial render
renderTable();
