import React from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { InvoiceButton } from './DownloadInvoice.styles';

const DownloadInvoice = ({ order }) => {
  const generateInvoice = () => {
    // eslint-disable-next-line new-cap
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Invoice', 14, 22);

    doc.setFontSize(12);
    doc.text(`Order ID: ${order._id}`, 14, 32);
    doc.text(`Order status: ${order.orderStatus}`, 14, 40);
    doc.text(`Date: ${new Date(order.orderedAt).toLocaleDateString()}`, 14, 48);

    const headers = [['Item', 'Price', 'Quantity', 'Total']];
    const rows = order.products.map((item) => [
      item.productName,
      `₹${item.productPrice.toFixed(2)}`,
      item.quantity,
      `₹${(item.productPrice * item.quantity).toFixed(2)}`,
    ]);

    autoTable(doc, {
      startY: 56,
      head: headers,
      body: rows,
    });

    const total = order.products.reduce((sum, item) => sum + item.productPrice * item.quantity, 0);
    doc.text(`Total: ₹${total.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 20);

    doc.save(`invoice-${order._id}.pdf`);
  };

  return (
    <InvoiceButton onClick={generateInvoice}>
      Invoice
    </InvoiceButton>
  );
};

export default DownloadInvoice;
