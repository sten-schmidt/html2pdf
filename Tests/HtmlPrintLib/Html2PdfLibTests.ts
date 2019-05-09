import path = require('path');
import fs = require('fs');
import crypto = require('crypto');
import { CheckSum } from '../../Tools/CheckSum';

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

        var checksum = new CheckSum();
        var chksum = checksum.getCheckSum(fileContent2, 'sha1', 'hex');
        expect(chksum).toBe("4aa8736791d977e8127b78afec61b5bb2d61528b");

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

        var checksum = new CheckSum();
        var chksum = checksum.getCheckSum(fileContent2, 'sha1', 'hex');
        expect(chksum).toBe("f72e95bc49f7b1c848c4fcc57696657a46d99fba");

    });
});
