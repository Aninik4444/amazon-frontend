import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { InvoiceButton } from './DownloadInvoice.styles';

const DownloadInvoice = ({ order }) => {
  const generateInvoice = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Invoice', 14, 22);

    doc.setFontSize(12);
    doc.text(`Order ID: ${order.id}`, 14, 32);
    doc.text(`Customer: ${order.customer.name}`, 14, 40);
    doc.text(`Email: ${order.customer.email}`, 14, 48);

    // Table headers and rows
    const headers = [['Item', 'Price', 'Quantity', 'Total']];
    const rows = order.items.map(item => [
      item.name,
      `$${item.price.toFixed(2)}`,
      item.quantity,
      `$${(item.price * item.quantity).toFixed(2)}`
    ]);

    autoTable(doc, {
      startY: 60,
      head: headers,
      body: rows,
    });

    const total = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    doc.text(`Total: $${total.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 20);

    doc.save(`invoice-${order.id}.pdf`);
  };

  return (
    <InvoiceButton onClick={generateInvoice} >
      Invoice
    </InvoiceButton>
  );
};

export default DownloadInvoice;
