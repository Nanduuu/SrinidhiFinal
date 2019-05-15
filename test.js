
const PDFDocument = require('./pdfkit-tables');
const fs = require('fs');

const doc = new PDFDocument;

console.log('pdf generator');


function generatePDF () {
        var writeStream = fs.createWriteStream('./Payslips/output.pdf');
        doc.pipe(writeStream);



            doc.fontSize(14).font('Times-Bold').text('Invoice',{
                        align:'right'
                });

                    doc.image('Payslips/logo.png', 495, 90, {width: 50});

                    doc.fontSize(12).font('Times-Bold').text('Cambridge Care Services', 50,80, {
                                margin:50,
                                align:'left',
    
                })
        doc.fontSize(10).font('Times-Roman').text('49, Edinburgh Avenue');
        doc.text('Sawston, CB22 3DW ');
        doc.text('Tel: 07340 685 509 ');
        doc.fillColor('blue').text('accounts@cambridgecareservices.co.uk ');
        doc.text('www.cambridgecareservices.co.uk');
        doc.fillColor('black').text('Company Reg. No. 09665143');
        doc.text('VAT Reg No: GB 297 8055 50');

        doc.fontSize(10).font('Times-Bold').text('INVOICE NO: VSH-RC-RGN0060', 350,200, {
                    align:'right',
    
        })
        doc.text( new Date().toISOString().slice(0,20), {
            align:'right'
        });
        doc.text('Due Date: 25th Jul 2018',{
            align:'right'
        });
                doc.text('TERMS: 30 DAYS',{
            align:'right'
    });


 
doc.moveDown(2); 

doc.fontSize(12).font('Times-Bold').text('INVOICE TO' ,50,200);
doc.fontSize(10).font('Times-Roman').text('xxxxxxxxxxxxx');
doc.text('xxxxxxxxxxxxx');
doc.text('xxxxxxxxxxxxx');
doc.text('xxxxxxxxxxxxx');
doc.text('xxxxxxxxxxxxx');
doc.text('xxxxxxxxxxxxx');


        doc.moveDown(2);

        doc.moveTo(50, 300)
                        .lineTo(550,300)
                        .lineWidth(0.5)
                        .opacity(0.7)
                        .stroke()
                        .opacity(1);

        doc.text('Please make payment payable to “Cambridge Care Services Limited"',{
            align:"center",
        })
        doc.text('Santander Bank – Account No: 00000000 – Sort Code: 00-00-00"',{
            align:"center",
        })

        doc.moveTo(50, 330)
                        .lineTo(550,330)
                        .lineWidth(0.5)
                        .opacity(0.7)
                        .stroke()
                        .opacity(1);

        doc.moveDown(2);

        const table0 = {
            headers: ['S.No', 'Place', 'Service','Description','Hours','Hourly Rates(€)','Amount(€)','VAT'],
            rows: [
                ['1','Richard charge','Nurse','Mon-Friday','5','10','50','0'],
                ['','','','Mon-Friday','5','10','50','0'],
                ['','','','Mon-Friday','5','10','50','0'],
                ['','','Doctor','Mon-Friday','5','10','50','0'],
                ['','','','Mon-Friday','5','10','50','0'],
                ['','','','Mon-Friday','5','10','50','0'],
                ['','','','','','Sub Total','','1000'],
                ['','','','','','VAT Total','','0'],
                ['','','','','','Total','','1000'],
                ['','','','','','Balance Due','','1000'],
         
            ]
        };



        doc.table(table0, {
            prepareHeader: () => doc.font('Helvetica-Bold').fontSize(7),
            prepareRow: (row, i) => doc.font('Helvetica').fontSize(5)
        });

        doc.moveDown(2)

        doc.fontSize(10).text('THANK YOU FOR YOUR BUSINESS!',{
            align:"center",
        })


        doc.moveDown();

        doc.fontSize(10).font('Times-Bold').text('Payment Terms',{
            align:"left",
        })
        doc.fontSize(10).font('Times-Roman').text('We request you to pay Total Balance Due amount within 30 days from the issue date of this invoice.',{
            align:"left",
        })
        doc.fontSize(10).font('Times-Bold').text('VAT Exemption Certificate',{
            align:"left",
        })
        doc.fontSize(10).font('Times-Roman').text('Please kindly send us your VAT exemption certificate, if applicable.',{
            align:"left",
        })



        doc.end();  

}
module.exports({
    generatePDF,
})

