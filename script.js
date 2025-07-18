
        let cheques = [];

        function addCheque() {
            const receiver = document.getElementById('receiver').value;
            const date = document.getElementById('date').value;
            const amount = document.getElementById('amount').value;

            if (receiver && date && amount) {
                const status = determineStatus(date);
                cheques.push({ receiver, date, amount, status });
                sortCheques();
                renderCheques();
                clearForm();
            } else {
                alert('Please fill all fields');
            }
        }

        function determineStatus(date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Normalize to midnight for comparison
            const chequeDate = new Date(date);
            chequeDate.setHours(0, 0, 0, 0);

            if (chequeDate > today) {
                return 'Pending';
            } else if (chequeDate < today) {
                return 'Passed';
            } else {
                return 'Due Today';
            }
        }

        function sortCheques() {
            cheques.sort((a, b) => new Date(a.date) - new Date(b.date));
        }

        function renderCheques() {
            const chequeList = document.getElementById('chequeList');
            chequeList.innerHTML = '';

            cheques.forEach((cheque, index) => {
                const card = document.createElement('div');
                card.className = 'cheque-card';
                card.innerHTML = `
                    <h3>${cheque.receiver}</h3>
                    <p>Date: ${cheque.date}</p>
                    <p>Amount: $${parseFloat(cheque.amount).toLocaleString()}</p>
                    <p>Status: <span class="status status-${cheque.status.toLowerCase().replace(' ', '-')}"">${cheque.status}</span></p>
                    <button class="delete-btn" onclick="confirmDelete(${index})">Delete</button>
                `;
                chequeList.appendChild(card);
            });
        }

        function confirmDelete(index) {
            const confirmDelete = confirm(`Are you sure you want to delete the cheque for ${cheques[index].receiver}?`);
            if (confirmDelete) {
                deleteCheque(index);
            }
        }

        function deleteCheque(index) {
            cheques.splice(index, 1);
            renderCheques();
        }

        function clearForm() {
            document.getElementById('receiver').value = '';
            document.getElementById('date').value = '';
            document.getElementById('amount').value = '';
        }
    