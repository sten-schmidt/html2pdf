import fs = require('fs');
//const {
//    PDFDocument,
//    PDFDocumentWriter,
//    StandardFonts,
//    drawLinesOfText,
//    drawImage,
//    drawRectangle,
//    degrees,
//    rgb
//} = require('pdf-lib');
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fontkit = require ('@pdf-lib/fontkit');
import path = require('path');
import { CheckSum } from '../../Tools/CheckSum';
import { PdfTools } from '../../Tools/PdfTools';

describe('PdfLibTests', () => {
    it('EditExistingPdf_WriteText', async () => {
        
        var examplePDF01 = path.resolve(__dirname, '../..', 'TestInput', 'ExamplePDFs', 'ExamplePDF_01.pdf');
        var outputPDF = path.resolve(__dirname, '../..', 'TestOutput', 'PdfLibTests_EditExistingPdf_WriteText.pdf');

        //Cleanup
        if (fs.existsSync(outputPDF)) fs.unlinkSync(outputPDF);
        expect(fs.existsSync(outputPDF)).toBeFalsy();

        //const pdfDoc = PDFDocumentFactory.load(fs.readFileSync(examplePDF01));
        const pdfDoc = await PDFDocument.load(fs.readFileSync(examplePDF01));

        //register fontkit 
        //https://github.com/Hopding/pdf-lib/tree/Rewrite#fontkit-installation
        pdfDoc.registerFontkit(fontkit);


        //const [fontRef, font] = pdfDoc.embedStandardFont(
        //    StandardFonts.TimesRomanItalic,
        //);
        const font = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic)

        //const FONT_NAME = font.fontName;
        //const FONT_NAME = timesRomanItalicFont.fontName;

        const pages = pdfDoc.getPages();

        //const existingPage = pages[0].addFontDictionary(FONT_NAME, fontRef);
        const existingPage = pages[0];

        existingPage.drawText('This text was added with JavaScript!', {
            x: 250,
            y: 750,
            size: 12,
            font: font,
            color: rgb(1, 0, 0),
            //rotate: degrees(-45),
        })

        //const newContentStream = pdfDoc.createContentStream(
        //    drawLinesOfText(
        //        //['This text was added', 'with JavaScript!'], //Multiline
        //        ['This text was added with JavaScript!'],
        //        {
        //            x: 250,
        //            y: 750,
        //            font: font, //FONT_NAME,
        //            size: 12,
        //            colorRgb: [1, 0, 0],
        //
        //        },
        //    ),
        //);

        //existingPage.addContentStreams(pdfDoc.register(newContentStream));

        
        //const pdfBytes = PDFDocumentWriter.saveToBytes(pdfDoc);
        
        const pdfBytes = await pdfDoc.save()
        fs.writeFileSync(outputPDF, pdfBytes);
        
        var checksum = new CheckSum();
        var chksumInput = checksum.getCheckSum(PdfTools.ReadFileWithoutDateFlags(examplePDF01), 'sha1', 'hex');
        expect(chksumInput).toBe("3187af6994ac92e71901e8fc36086d5393966e65");

        //Does not work with pdfLib since V1.0
        //var chksumOutput = checksum.getCheckSum(PdfTools.ReadFileWithoutDateFlags(outputPDF), 'sha1', 'hex');
        //expect(chksumOutput).toBe("c70c92fe2c8e80a6346d5b70bce344a873c8fb26");

        //Alternative: Grafik aus der PDF erstellen und vergleichen???


    });
});