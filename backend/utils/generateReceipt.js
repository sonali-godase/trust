const PDFDocument = require("pdfkit");

/**
 * Generates a PDF receipt for a donation.
 * 
 * @param {Object} donation - The donation details.
 * @param {string} donation.donorName - The name of the devotee.
 * @param {number} donation.amount - The donation amount.
 * @param {string} donation.purpose - The purpose of the donation.
 * @param {string} donation.transactionId - The Razorpay transaction ID.
 * @param {string} donation.paymentMethod - The payment method used.
 * @param {Date|string} donation.date - The date of the donation.
 * @returns {Promise<Buffer>} A promise that resolves to the PDF buffer.
 */
exports.generateReceiptPdf = (donation) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50, size: "A4" });
      const buffers = [];

      doc.on("data", (chunk) => buffers.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(buffers)));
      doc.on("error", (err) => reject(err));

      // Header Section
      doc.rect(0, 0, doc.page.width, 25).fill("#4A0E0E"); // Mahakal Burgundy header bar
      doc.moveDown(2);

      // Temple Branding
      doc.fillColor("#4A0E0E")
         .font("Helvetica-Bold")
         .fontSize(28)
         .text("KOLEKAR MAHA SWAMIJI MATH, KOLE", { align: "center" });

      doc.fillColor("#666666")
         .font("Helvetica")
         .fontSize(10)
         .text("Regd. No. E-1234/MH | Email: contact@kolekarmath.org", { align: "center" })
         .text("Monastery Complex, Kole, Maharashtra, India", { align: "center" });
      
      doc.moveDown(1.5);

      // Gold Divider Accent Line
      doc.strokeColor("#D4AF37")
         .lineWidth(3)
         .moveTo(50, doc.y)
         .lineTo(doc.page.width - 50, doc.y)
         .stroke();
      
      doc.moveDown(2);

      // Title
      doc.fillColor("#4A0E0E")
         .font("Helvetica-Bold")
         .fontSize(18)
         .text("DONATION RECEIPT", { align: "center", underline: true });
      
      doc.moveDown(2);

      // Receipt Metadata
      const receiptNo = `REC-${Date.now().toString().slice(-6)}`;
      const formattedDate = new Date(donation.date || Date.now()).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      });

      doc.fillColor("#333333")
         .font("Helvetica-Bold")
         .fontSize(11)
         .text(`Receipt No: ${receiptNo}`, 50, doc.y)
         .text(`Date: ${formattedDate}`, doc.page.width - 200, doc.y - 12);
      
      doc.moveDown(2);

      // Details Table Border
      const tableStartY = doc.y;
      doc.strokeColor("#E5E7EB")
         .lineWidth(1)
         .rect(50, tableStartY, doc.page.width - 100, 180)
         .stroke();

      // Table Content
      doc.font("Helvetica")
         .fontSize(12)
         .fillColor("#4B5563");

      const printRow = (label, value, yOffset) => {
        doc.font("Helvetica-Bold").text(label, 70, tableStartY + yOffset);
        doc.font("Helvetica").text(`:  ${value}`, 200, tableStartY + yOffset);
      };

      printRow("Received With Thanks From", donation.donorName, 20);
      printRow("Donation Amount", `INR ${donation.amount.toLocaleString("en-IN")}/-`, 50);
      printRow("Donation Purpose", donation.purpose || "General Contribution", 80);
      printRow("Payment Method", donation.paymentMethod || "Razorpay", 110);
      printRow("Transaction ID", donation.transactionId || "N/A", 140);

      doc.moveDown(8);

      // Blessings / Gratitude note
      doc.fillColor("#4A0E0E")
         .font("Helvetica-Oblique")
         .fontSize(12)
         .text('"May the divine blessings of Kolekar Maha Swamiji be always with you and your family."', { align: "center" });

      doc.moveDown(3);

      // Signature Area
      const sigY = doc.y;
      doc.strokeColor("#D1D5DB")
         .lineWidth(1)
         .moveTo(doc.page.width - 200, sigY)
         .lineTo(doc.page.width - 50, sigY)
         .stroke();

      doc.fillColor("#374151")
         .font("Helvetica")
         .fontSize(10)
         .text("Authorized Signatory", doc.page.width - 200, sigY + 5, { align: "center" });

      // Bottom footer bar
      doc.rect(0, doc.page.height - 25, doc.page.width, 25).fill("#4A0E0E");

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};
