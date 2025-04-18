import { NextRequest } from 'next/server';
import jsPDF from 'jspdf';

function formatCurrency(amount: string | number) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(Number(amount));
}

export async function POST(request: NextRequest) {
    const data = await request.json();
    
    const { patientName, patientPhone, appointmentId, service, amount, date } = data;
    
    const doc = new jsPDF();

    // Add clinic logo or name
    doc.setFontSize(24);
    doc.setTextColor(41, 37, 36); // Warm gray
    doc.text('NIVASS DENTAL CLINIC', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text('No 35, Kdrs Complex, Thayiur Market Road, Kelambakkam, Chennai - 603103', 105, 28, { align: 'center' });

    // Add divider
    doc.setDrawColor(41, 37, 36);
    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35);

    // Invoice title and number
    doc.setFontSize(16);
    doc.text('INVOICE', 20, 50);
    doc.setFontSize(10);
    doc.text(`#${appointmentId.slice(0, 4)}`, 190, 50, { align: 'right' });

    // Date
    doc.setFontSize(10);
    doc.text(`Date: ${date}`, 190, 60, { align: 'right' });

    // Patient Details
    doc.setFontSize(12);
    doc.setTextColor(82, 82, 82); // Gray
    doc.text('BILL TO', 20, 75);
    doc.setFontSize(11);
    doc.setTextColor(41, 37, 36);
    doc.text(patientName, 20, 82);
    doc.setFontSize(10);
    doc.text(patientPhone, 20, 89);

    // Service Details
    doc.setLineWidth(0.1);
    doc.line(20, 100, 190, 100);

    // Table header
    doc.setFontSize(10);
    doc.setTextColor(82, 82, 82);
    doc.text('SERVICE', 20, 108);
    doc.text('AMOUNT', 160, 108, { align: 'right' });

    // Service line
    doc.setTextColor(41, 37, 36);
    doc.text(service, 20, 118);
    doc.text(amount.toString(), 160, 118, { align: 'right' });

    // Total
    doc.line(20, 128, 190, 128);
    doc.setFontSize(11);
    doc.text('Total Amount:', 120, 138);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(amount.toString(), 190, 138, { align: 'right' });

    // Footer
    doc.setFontSize(9);
    doc.setTextColor(128, 128, 128);
    doc.text('Thank you for choosing Nivass Dental Clinic', 105, 180, { align: 'center' });
    doc.text('For any queries, please contact us', 105, 185, { align: 'center' });

    // Get PDF as array buffer
    const pdfBuffer = doc.output('arraybuffer');

    return new Response(pdfBuffer, {
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=invoice-${appointmentId}.pdf`,
        },
    });
}
