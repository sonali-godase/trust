import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generateDonationReceipt = (donation) => {
  const doc = new jsPDF('p', 'pt', 'a4');

  // Trust Information
  const trustName = "KOLEKAR MAHA SWAMIJI MATH";
  const trustAddress = "Kolekar Monastery, Main Temple Road, Solapur";
  const trustContact = "Phone: +91 8421004824 | Email: trust@kolekarmath.com";

  // Colors
  const burgundy = [121, 26, 31];
  const saffron = [255, 122, 47];

  // Header Border
  doc.setDrawColor(saffron[0], saffron[1], saffron[2]);
  doc.setLineWidth(2);
  doc.rect(20, 20, 555, 802); // Outer Border

  // Header Background
  doc.setFillColor(burgundy[0], burgundy[1], burgundy[2]);
  doc.rect(20, 20, 555, 100, 'F');

  // Header Text
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text(trustName, 297, 60, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(trustAddress, 297, 80, { align: 'center' });
  doc.text(trustContact, 297, 95, { align: 'center' });

  // Receipt Title
  doc.setTextColor(burgundy[0], burgundy[1], burgundy[2]);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text("DONATION RECEIPT", 297, 150, { align: 'center' });
  doc.setLineWidth(1);
  doc.line(220, 155, 375, 155);

  // Receipt Details (Top Section)
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  
  doc.text(`Receipt No:`, 50, 190);
  doc.setFont('helvetica', 'normal');
  doc.text(`${donation.receiptNumber || 'N/A'}`, 120, 190);

  doc.setFont('helvetica', 'bold');
  doc.text(`Date:`, 400, 190);
  doc.setFont('helvetica', 'normal');
  doc.text(`${new Date(donation.updatedAt || donation.createdAt).toLocaleDateString()}`, 440, 190);

  // Donor Details Table
  doc.autoTable({
    startY: 230,
    theme: 'grid',
    headStyles: { fillColor: burgundy, textColor: [255, 255, 255], fontStyle: 'bold' },
    bodyStyles: { textColor: [0, 0, 0], fontSize: 11 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 150, fillColor: [250, 245, 245] },
      1: { cellWidth: 355 }
    },
    body: [
      ['Donor Name', donation.donorName],
      ['Mobile Number', donation.phone],
      ['Email Address', donation.email || 'N/A'],
      ['Address', donation.address || 'N/A'],
    ]
  });

  // Payment Details Table
  const nextY = doc.lastAutoTable.finalY + 30;
  
  doc.autoTable({
    startY: nextY,
    theme: 'grid',
    headStyles: { fillColor: saffron, textColor: [255, 255, 255], fontStyle: 'bold' },
    bodyStyles: { textColor: [0, 0, 0], fontSize: 11 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 150, fillColor: [255, 250, 245] },
      1: { cellWidth: 355 }
    },
    body: [
      ['Amount Received', `Rs. ${donation.amount}/-`],
      ['Payment Method', 'UPI / Online Transfer'],
      ['Transaction UTR', donation.utrNumber || 'N/A'],
      ['System Reference', donation.donationReference],
      ['Status', 'Verified & Approved']
    ]
  });

  // Footer Section
  const footerY = doc.lastAutoTable.finalY + 60;
  
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  doc.text("This is a computer-generated receipt and does not require a physical signature.", 297, footerY, { align: 'center' });
  
  doc.setFont('helvetica', 'normal');
  doc.text(`Verify this receipt at: ${window.location.origin}/verify-receipt/${donation.receiptNumber}`, 297, footerY + 20, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.text("Authorized Signatory", 480, footerY + 80, { align: 'center' });
  doc.setDrawColor(0,0,0);
  doc.line(420, footerY + 65, 540, footerY + 65);

  // Save the PDF
  doc.save(`Donation_Receipt_${donation.receiptNumber}.pdf`);
};
