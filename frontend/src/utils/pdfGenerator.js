import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generatePDFReport = (expenses, dateRange) => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.setTextColor(102, 126, 234);
    doc.text('Expense Report', 14, 22);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 30);
    if (dateRange.start && dateRange.end) {
        doc.text(`Period: ${dateRange.start} to ${dateRange.end}`, 14, 36);
    }

    // Summary
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const categoryTotals = expenses.reduce((acc, exp) => {
        acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
        return acc;
    }, {});

    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Summary', 14, 46);

    doc.setFontSize(10);
    doc.text(`Total Expenses: ₹${total.toFixed(2)}`, 14, 54);
    doc.text(`Total Transactions: ${expenses.length}`, 14, 60);
    doc.text(`Average per Transaction: ₹${(total / expenses.length).toFixed(2)}`, 14, 66);

    // Category breakdown
    let yPos = 76;
    doc.text('Category Breakdown:', 14, yPos);
    yPos += 6;
    Object.entries(categoryTotals).forEach(([category, amount]) => {
        const percentage = ((amount / total) * 100).toFixed(1);
        doc.text(`${category}: ₹${amount.toFixed(2)} (${percentage}%)`, 20, yPos);
        yPos += 6;
    });

    // Transactions table
    const tableData = expenses.map(exp => [
        new Date(exp.date).toLocaleDateString(),
        exp.description,
        exp.category,
        `₹${exp.amount.toFixed(2)}`
    ]);

    doc.autoTable({
        startY: yPos + 10,
        head: [['Date', 'Description', 'Category', 'Amount']],
        body: tableData,
        theme: 'grid',
        headStyles: {
            fillColor: [102, 126, 234],
            textColor: 255,
            fontStyle: 'bold'
        },
        styles: {
            fontSize: 9,
            cellPadding: 3
        },
        alternateRowStyles: {
            fillColor: [245, 245, 250]
        }
    });

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(
            `Page ${i} of ${pageCount}`,
            doc.internal.pageSize.getWidth() / 2,
            doc.internal.pageSize.getHeight() - 10,
            { align: 'center' }
        );
    }

    // Save
    doc.save(`expense-report-${new Date().toISOString().split('T')[0]}.pdf`);
};
