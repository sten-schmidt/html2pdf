"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class PdfTools {
    static ReadFileWithoutDateFlags(pdfFilePath) {
        var result = '';
        var fileContentExamplePDF = fs.readFileSync(pdfFilePath, 'latin1');
        var lines = fileContentExamplePDF.split(/\r?\n/);
        for (var i = 0; i < lines.length; i++) {
            if (!lines[i].startsWith('/CreationDate') &&
                !lines[i].startsWith('/ModDate')) {
                result += lines[i];
            }
        }
        return result;
    }
}
exports.PdfTools = PdfTools;
//# sourceMappingURL=PdfTools.js.map