document.addEventListener('DOMContentLoaded', function() {
    const results = JSON.parse(localStorage.getItem('searchResults'));
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = ''; // Clear previous results

    if (!results || results.length === 0) {
        resultContainer.innerHTML = '<p>No results found</p>';
        return;
    }

    const table = document.createElement('table');
    results.forEach((row) =>
        {
        const tr = document.createElement('tr');
        row.forEach((cell) => {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });

    resultContainer.appendChild(table);
});
