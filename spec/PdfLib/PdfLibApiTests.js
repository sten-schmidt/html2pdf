"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const { PDFDocumentFactory, PDFDocumentWriter, StandardFonts, drawLinesOfText, drawImage, drawRectangle, } = require('pdf-lib');
const path = require("path");
const CheckSum_1 = require("../../Tools/CheckSum");
const PdfTools_1 = require("../../Tools/PdfTools");
describe('PdfLibTests', () => {
    it('EditExistingPdf_WriteText', async () => {
        var examplePDF01 = path.resolve(__dirname, '../..', 'TestInput', 'ExamplePDFs', 'ExamplePDF_01.pdf');
        var outputPDF = path.resolve(__dirname, '../..', 'TestOutput', 'PdfLibTests_EditExistingPdf_WriteText.pdf');
        //Cleanup
        if (fs.existsSync(outputPDF))
            fs.unlinkSync(outputPDF);
        expect(fs.existsSync(outputPDF)).toBeFalsy();
        const pdfDoc = PDFDocumentFactory.load(fs.readFileSync(examplePDF01));
        const [fontRef, font] = pdfDoc.embedStandardFont(StandardFonts.TimesRomanItalic);
        const FONT_NAME = font.fontName;
        const pages = pdfDoc.getPages();
        const existingPage = pages[0].addFontDictionary(FONT_NAME, fontRef);
        const newContentStream = pdfDoc.createContentStream(drawLinesOfText(
        //['This text was added', 'with JavaScript!'], //Multiline
        ['This text was added with JavaScript!'], {
            x: 250,
            y: 750,
            font: FONT_NAME,
            size: 12,
            colorRgb: [1, 0, 0],
        }));
        existingPage.addContentStreams(pdfDoc.register(newContentStream));
        const pdfBytes = PDFDocumentWriter.saveToBytes(pdfDoc);
        fs.writeFileSync(outputPDF, pdfBytes);
        var checksum = new CheckSum_1.CheckSum();
        var chksumInput = checksum.getCheckSum(PdfTools_1.PdfTools.ReadFileWithoutDateFlags(examplePDF01), 'sha1', 'hex');
        expect(chksumInput).toBe("3187af6994ac92e71901e8fc36086d5393966e65");
        var chksumOutput = checksum.getCheckSum(PdfTools_1.PdfTools.ReadFileWithoutDateFlags(outputPDF), 'sha1', 'hex');
        expect(chksumOutput).toBe("484989705d8cfca98e68b57784b9f793512ef949");
    });
});
//# sourceMappingURL=PdfLibApiTests.js.map