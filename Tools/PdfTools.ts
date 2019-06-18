import fs = require('fs');

class PdfTools {

    public static ReadFileWithoutDateFlags(pdfFilePath: string):string {

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

export { PdfTools };