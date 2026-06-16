export const exportToCSV = (data, filename) => {
  if (!data || !data.length) return;
  
  // Extract headers
  const headers = Object.keys(data[0]);
  const csvRows = [];
  
  // Push headers
  csvRows.push(headers.map(h => `"${h}"`).join(','));

  // Push rows
  for (const row of data) {
    const values = headers.map(header => {
      let val = row[header];
      if (val === null || val === undefined) val = '';
      const escaped = ('' + val).replace(/"/g, '""');
      
      // Force Excel to treat Date and Reference as string formulas so it doesn't try to parse and overflow column width
      if (header === 'Date' || header === 'Reference' || header === 'DonationReference' || header === 'Branch') {
        return `="${escaped}"`;
      }
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }

  // Create blob and download with BOM for Excel UTF-8 support
  const csvData = csvRows.join('\n');
  const blob = new Blob(['\uFEFF' + csvData], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
