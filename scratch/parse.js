const fs = require('fs');
const pdf = require('pdf-parse');

const pdfPath = 'C:/Users/admin/OneDrive/Documents/Downloads/Web Application Quotation (1).pdf';

let dataBuffer = fs.readFileSync(pdfPath);

pdf(dataBuffer).then(function(data) {
    console.log(data.text);
}).catch(err => {
    console.error("Error reading PDF:", err);
});
