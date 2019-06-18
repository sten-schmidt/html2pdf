"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const CheckSum_1 = require("../../Tools/CheckSum");
const PdfTools_1 = require("../../Tools/PdfTools");
describe('PdfLibTests', () => {
    it('EditExistingPdf_WriteText', async () => {
        var examplePDF01 = path.resolve(__dirname, '../..', 'TestInput', 'ExamplePDFs', 'ExamplePDF_01.pdf');
        var outputPDF = path.resolve(__dirname, '../..', 'TestOutput', 'PdfLibTests_EditExistingPdf_WriteText.pdf');
        //var html = path.resolve(__dirname, '../..', 'TestInput', 'Example1', 'index.html');
        //var css = path.resolve(__dirname, '../..', 'TestInput', 'Example1', 'more.css');
        //var pdf = path.resolve(__dirname, '../..', 'TestOutput', 'example1_More_CSS.pdf');
        //const html2PdfLib = require('../../Html2PdfLib');
        //const result = await html2PdfLib.convertHtml(html, css, pdf);
        //expect(result).toBe(true);
        //expect(false).toBe(true);
        var checksum = new CheckSum_1.CheckSum();
        var chksum = checksum.getCheckSum(PdfTools_1.PdfTools.ReadFileWithoutDateFlags(examplePDF01), 'sha1', 'hex');
        expect(chksum).toBe("3187af6994ac92e71901e8fc36086d5393966e65");
    });
});
//# sourceMappingURL=PdfLibApiTest1.js.map