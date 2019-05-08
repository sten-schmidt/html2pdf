"use strict";
/*
 * Jasmine Testfile
 */
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
function checksum(str, algorithm, encoding) {
    return crypto
        .createHash(algorithm || 'md5')
        .update(str, 'utf8')
        .digest(encoding || 'hex');
}
describe('Test Suite 1', () => {
    it('Test 1', async () => {
        expect(1).toBe(1);
        var html = path.resolve(__dirname, '..', 'Examples', 'Example1', 'index.html');
        var css = path.resolve(__dirname, '..', 'Examples', 'Example1', 'more.css');
        var pdf = path.resolve(__dirname, '..', 'TestOutput', 'example1_More_CSS.pdf');
        const html2PdfLib = require('../Html2PdfLib');
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
        var chksum = checksum(fileContent2, 'sha1', 'hex');
        expect("4aa8736791d977e8127b78afec61b5bb2d61528b").toBe(chksum);
    });
    //it('Test 2', () => {
    //    fail("this is expected to fail.")
    //});
});
//# sourceMappingURL=Html2PdfLibTests.js.map