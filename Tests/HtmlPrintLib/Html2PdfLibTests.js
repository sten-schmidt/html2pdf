"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const CheckSum_1 = require("../../Tools/CheckSum");
describe('Html2PdfLib', () => {
    it('example1_More_CSS', async () => {
        var html = path.resolve(__dirname, '../..', 'Examples', 'Example1', 'index.html');
        var css = path.resolve(__dirname, '../..', 'Examples', 'Example1', 'more.css');
        var pdf = path.resolve(__dirname, '../..', 'TestOutput', 'example1_More_CSS.pdf');
        const html2PdfLib = require('../../Html2PdfLib');
        const result = await html2PdfLib.convertHtml(html, css, pdf);
        expect(result).toBe(true);
        var fileContent = fs.readFileSync(pdf, 'latin1');
        var fileContent2 = '';
        var lines = fileContent.split(/\r?\n/);
        for (var i = 0; i < lines.length; i++) {
            if (!lines[i].startsWith('/CreationDate') &&
                !lines[i].startsWith('/ModDate')) {
                fileContent2 += lines[i];
            }
        }
        var checksum = new CheckSum_1.CheckSum();
        var chksum = checksum.getCheckSum(fileContent2, 'sha1', 'hex');
        expect(chksum).toBe("47648a600cc82a60c504020d995019788181b051");
    });
    it('example1_No_seperate_CSS', async () => {
        var html = path.resolve(__dirname, '../..', 'Examples', 'Example1', 'index.html');
        var pdf = path.resolve(__dirname, '../..', 'TestOutput', 'example1_No_seperate_CSS.pdf');
        const html2PdfLib = require('../../Html2PdfLib');
        const result = await html2PdfLib.convertHtml(html, undefined, pdf);
        expect(result).toBe(true);
        var fileContent = fs.readFileSync(pdf, 'latin1');
        var fileContent2 = '';
        var lines = fileContent.split(/\r?\n/);
        for (var i = 0; i < lines.length; i++) {
            if (!lines[i].startsWith('/CreationDate') &&
                !lines[i].startsWith('/ModDate')) {
                fileContent2 += lines[i];
            }
        }
        var checksum = new CheckSum_1.CheckSum();
        var chksum = checksum.getCheckSum(fileContent2, 'sha1', 'hex');
        expect(chksum).toBe("1902cdaba32a48690346c8b369aafa8ec7664172");
    });
    it('example2_viewport', async () => {
        var html = path.resolve(__dirname, '../..', 'Examples', 'Example2', 'viewport.html');
        var pdf = path.resolve(__dirname, '../..', 'TestOutput', 'example2_viewport.pdf');
        const html2PdfLib = require('../../Html2PdfLib');
        const result = await html2PdfLib.convertHtml(html, undefined, pdf, undefined, undefined, undefined, undefined, undefined, true);
        expect(result).toBe(true);
        var fileContent = fs.readFileSync(pdf, 'latin1');
        var fileContent2 = '';
        var lines = fileContent.split(/\r?\n/);
        for (var i = 0; i < lines.length; i++) {
            if (!lines[i].startsWith('/CreationDate') &&
                !lines[i].startsWith('/ModDate')) {
                fileContent2 += lines[i];
            }
        }
        var checksum = new CheckSum_1.CheckSum();
        var chksum = checksum.getCheckSum(fileContent2, 'sha1', 'hex');
        expect(chksum).toBe("5161c36a766396f13d4f0914352e142b5f202d87");
    });
});
//# sourceMappingURL=Html2PdfLibTests.js.map