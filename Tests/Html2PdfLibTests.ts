import assert = require('assert');
import path = require('path');
import crypto = require('crypto');
import fs = require('fs');
//import crc = require('crc');

//import proc = require('child_process');

function checksum(str, algorithm, encoding) {
    return crypto
        .createHash(algorithm || 'md5')
        .update(str, 'utf8')
        .digest(encoding || 'hex')
}


describe("Test Suite 1", () => {

    it('Example_1_More_CSS', () => {
        var html = path.resolve(__dirname, '..', 'Examples', 'Example1', 'index.html');
        var css = path.resolve(__dirname, '..', 'Examples', 'Example1', 'more.css');
        var pdf = path.resolve(__dirname, '..', 'TestOutput', 'example1_More_CSS.pdf');

        const html2PdfLib = require('../Html2PdfLib');
        var result = false;

        result = html2PdfLib.convertHtml(html, css, pdf);

        assert.ok(result, "This shouldn't fail"); //TODO: failed nicht
        
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
        assert.ok("4aa8736791d977e8127b78afec61b5bb2d61528b" === chksum, "File has not the exprected checksum.")
  
    });

    it("Example_1_No_Extra_CSS", () => {

        var html = path.resolve(__dirname, '..', 'Examples', 'Example1', 'index.html');
        var pdf = path.resolve(__dirname, '..', 'TestOutput', 'example1_No_Extra_CSS.pdf');

        const html2PdfLib = require('../Html2PdfLib');
        var result = false;

        result = html2PdfLib.convertHtml(html, undefined, pdf);

        assert.ok(result, "This shouldn't fail");  //TODO: failed nicht
                
    });

    //it("Test B", () => {
    //    assert.ok(1 === 1, "This shouldn't fail");
    //    assert.ok(false, "This should fail");
    //});

});
