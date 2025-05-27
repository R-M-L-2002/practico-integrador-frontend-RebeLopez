import { jsPDF } from "jspdf";

const exportToPDF = (title, data, columns) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const marginLeft = 14;
  const marginTop = 22;
  const rowHeight = 10;
  let y = marginTop;

  doc.setFontSize(18);
  doc.setTextColor("#4B0082"); 
  doc.text(`Lista de ${title}`, pageWidth / 2, y, { align: 'center' });
  y += 12;

  const totalWidth = pageWidth - marginLeft * 2;
  let totalColumnsWidth = columns.reduce((sum, c) => sum + (c.width || 0), 0);
  if (totalColumnsWidth === 0) {
    columns.forEach(c => c.width = totalWidth / columns.length);
  } else {
    columns.forEach(c => c.width = (c.width / totalColumnsWidth) * totalWidth);
  }

  doc.setFillColor("#C8A2C8"); 
  doc.rect(marginLeft, y, totalWidth, rowHeight, 'F');

  const tableTopY = y; 

  doc.setFontSize(14);
  doc.setTextColor("#3B007A");
  let x = marginLeft;
  columns.forEach(col => {
    doc.text(col.header, x + 2, y + 6);
    x += col.width;
  });

  doc.setDrawColor("#6A0DAD");
  doc.setLineWidth(0.5);
  doc.line(marginLeft, y + rowHeight, marginLeft + totalWidth, y + rowHeight);

  y += rowHeight;

  doc.setFontSize(12);
  doc.setTextColor("#4B0082");

  data.forEach((item, idx) => {
    x = marginLeft;

    if (y + rowHeight > 290) {
      doc.addPage();
      y = marginTop;

      doc.setFillColor("#C8A2C8");
      doc.rect(marginLeft, y, totalWidth, rowHeight, 'F');

      tableTopY = y;

      doc.setFontSize(14);
      doc.setTextColor("#3B007A");
      let xHeader = marginLeft;
      columns.forEach(col => {
        doc.text(col.header, xHeader + 2, y + 6);
        xHeader += col.width;
      });
      doc.setDrawColor("#6A0DAD");
      doc.line(marginLeft, y + rowHeight, marginLeft + totalWidth, y + rowHeight);
      y += rowHeight;
      doc.setFontSize(12);
      doc.setTextColor("#4B0082");
    }

    if (idx % 2 === 0) {
      doc.setFillColor("#E6D1F2");
      doc.rect(marginLeft, y, totalWidth, rowHeight, 'F');
    } else {
      doc.setFillColor("#D1B3E0");
      doc.rect(marginLeft, y, totalWidth, rowHeight, 'F');
    }

    columns.forEach(col => {
      const text = col.format ? col.format(item[col.field]) : String(item[col.field]);
      doc.text(text, x + 2, y + 6);
      x += col.width;
    });

    doc.setDrawColor("#6A0DAD");
    doc.setLineWidth(0.3);
    doc.line(marginLeft, y + rowHeight, marginLeft + totalWidth, y + rowHeight);

    y += rowHeight;
  });

  // Lineas
  let lineX = marginLeft;
  columns.forEach(col => {
    doc.line(lineX, tableTopY, lineX, y);
    lineX += col.width;
  });
  doc.line(lineX, tableTopY, lineX, y);

  doc.save(`${title}.pdf`);
};

export default exportToPDF;
