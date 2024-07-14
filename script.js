document.getElementById('fileInput').addEventListener('change', handleFile, false);
document.getElementById('searchButton').addEventListener('click', searchExcel, false);

let excelData = [];

function handleFile(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        workbook.SheetNames.forEach(sheetName => {
            const worksheet = workbook.Sheets[sheetName];
            const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            excelData = excelData.concat(sheetData);
        });
    };
    reader.readAsArrayBuffer(file);
}

function searchExcel() {
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    const results = [];

    excelData.forEach((row) => {
        if (row.some(cell => cell && cell.toString().toLowerCase().includes(searchText))) {
            results.push(row);
        }
    });

    // Sort results based on the first column (index 0), change the index as needed
    results.sort((a, b) => {
        if (a[0] && b[0]) {
            return a[0].toString().localeCompare(b[0].toString());
        }
        return 0;
    });

    localStorage.setItem('searchResults', JSON.stringify(results));
    window.location.href = 'result.html';
}