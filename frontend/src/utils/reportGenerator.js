import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateFinancialReport = (data, filters) => {
  if (!data || data.length === 0) {
    alert("No data available to generate report.");
    return;
  }

  const doc = new jsPDF('p', 'pt', 'a4');

  // Title & Header
  doc.setFillColor(74, 14, 14); // Burgundy
  doc.rect(0, 0, doc.internal.pageSize.width, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Shri Gurumurti Rudrapashupati Lingayat Monastery Trust", doc.internal.pageSize.width / 2, 25, { align: 'center' });

  doc.setTextColor(50, 50, 50);
  doc.setFontSize(18);
  doc.text("Financial Donations Report", 40, 70);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  
  // Filter context
  const yearText = filters.year ? `Year: ${filters.year}` : "Year: All";
  const monthText = filters.month !== '' ? `Month: ${new Date(2000, parseInt(filters.month)).toLocaleString('default', { month: 'long' })}` : "Month: All";
  const branchText = filters.branchName || "Branch: All";
  const statusText = filters.status ? `Status: ${filters.status}` : "Status: All";
  
  doc.text(`Generated On: ${new Date().toLocaleDateString()}`, 40, 90);
  doc.text(`${yearText} | ${monthText} | ${branchText} | ${statusText}`, 40, 105);

  // Calculate Metrics
  const approved = data.filter(d => d.status === 'APPROVED');
  const rejected = data.filter(d => d.status === 'REJECTED');
  
  const totalApprovedAmount = approved.reduce((sum, d) => sum + d.amount, 0);
  const totalRejectedAmount = rejected.reduce((sum, d) => sum + d.amount, 0);
  const totalDonors = new Set(data.map(d => d.donorName)).size;

  // Executive Summary
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Executive Summary", 40, 135);

  autoTable(doc, {
    startY: 145,
    head: [['Metric', 'Value']],
    body: [
      ['Total Approved Donations', `INR ${totalApprovedAmount.toLocaleString()}`],
      ['Total Approved Count', approved.length.toString()],
      ['Total Rejected Amount', `INR ${totalRejectedAmount.toLocaleString()}`],
      ['Total Rejected Count', rejected.length.toString()],
      ['Unique Donors', totalDonors.toString()],
    ],
    theme: 'grid',
    headStyles: { fillColor: [40, 40, 40] },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 200 },
      1: { cellWidth: 100 }
    },
    margin: { left: 40 }
  });

  // Monthly Breakdown
  const monthlyData = {};
  data.forEach(d => {
    if (d.status !== 'APPROVED') return; // Only breakdown approved revenue
    const m = new Date(d.date).toLocaleString('default', { month: 'short', year: 'numeric' });
    if (!monthlyData[m]) monthlyData[m] = { count: 0, amount: 0 };
    monthlyData[m].count += 1;
    monthlyData[m].amount += d.amount;
  });

  const monthRows = Object.keys(monthlyData).map(k => [
    k, 
    monthlyData[k].count.toString(), 
    `INR ${monthlyData[k].amount.toLocaleString()}`
  ]);

  let nextY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 30 : 250;

  if (monthRows.length > 0) {
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Monthly Breakdown (Approved)", 40, nextY);

    autoTable(doc, {
      startY: nextY + 10,
      head: [['Month', 'No. of Donations', 'Total Amount']],
      body: monthRows,
      theme: 'striped',
      headStyles: { fillColor: [60, 100, 180] }
    });
    nextY = doc.lastAutoTable.finalY + 30;
  }

  // Detailed Ledger
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Detailed Ledger", 40, nextY);

  const ledgerRows = data.map(d => [
    new Date(d.date).toLocaleDateString(),
    d.donationReference || 'N/A',
    d.donorName,
    d.branchId?.name || 'Main Trust',
    d.status || 'PENDING',
    d.amount.toLocaleString()
  ]);

  autoTable(doc, {
    startY: nextY + 10,
    head: [['Date', 'Ref ID', 'Donor Name', 'Branch', 'Status', 'Amount (INR)']],
    body: ledgerRows,
    theme: 'grid',
    headStyles: { fillColor: [50, 50, 50] },
    didDrawPage: function (data) {
      // Footer with page number
      const str = 'Page ' + doc.internal.getNumberOfPages();
      doc.setFontSize(8);
      const pageSize = doc.internal.pageSize;
      const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
      doc.text(str, data.settings.margin.left, pageHeight - 10);
    }
  });

  // Save the PDF
  const filename = `Financial_Report_${new Date().getTime()}.pdf`;
  doc.save(filename);
};
