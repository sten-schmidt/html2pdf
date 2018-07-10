/**
 * @name Html2Pdf
 * @description Html2Pdf - A simple commandline HTML to PDF converter using node and puppeteer
 * @author Sten Schmidt
 * @version 1.0
 */

const args = require('optimist').argv
const log4js = require('log4js');
const logger = log4js.getLogger();
const html2PdfLib = require('./Html2PdfLib');

(async () => {

    try {

        var help = `A simple commandline HTML to PDF converter using node and puppeteer

Usage: node html2pdf.js --html=<HtmlFile> --pdf=<PdfFile> <optional parameters>

Parameters:
    --html=HTML_PATH
        URL to a webressource or path to a local HTML file. URL must start with
        'http'. A path to a local file is automatically converted into file:///
        syntax.
    --pdf=PDF_PATH
        The file path to save the PDF to. If 'pdf' is a relative path, then it 
        is resolved relative to current working directory.

Optional parameters:
    --css=CSS_PATH
        URL to a webressource or path to a local CSS file. Additional CSS styles
        will applyed before pdf generation. URL must start with 'http'. A path 
        to a local file is automatically converted into file:/// syntax.
    --landscape
        Paper orientation. default false.
    --format=PAPER_FORMAT
        Paper format, possible values are Letter, Legal, Tabloid, Ledger, 
        A0, A1, A2, A3, A4, A5, A6.  If set, takes priority over width or 
        height options. Defaults to 'A4'.
    --width=PAPER_WIDTH
        Paper width, accepts values labeled with units, possible units: px, in,
        cm, mm.
    --height=PAPER_HEIGHT
        Paper height, accepts values labeled with units, possible units: px, 
        in, cm, mm.
    --margintop=VALUE
        Top margin, accepts values labeled with units, possible units: px, in, 
        cm, mm.
    --marginright=VALUE
        Right margin, accepts values labeled with units, possible units: px, 
        in, cm, mm.
    --marginbottom=VALUE
        Bottom margin, accepts values labeled with units, possible units: px, 
        in, cm, mm.
    --marginleft=VALUE
        Left margin, accepts values labeled with units, possible units: px, in,
        cm, mm.
    --pageRanges=RANGE
        Paper ranges to print, e.g., '1-5, 8, 11-13'. Defaults to the empty 
        string, which means print all pages.
    --printBackground
        Print background graphics. default false.
    --scale=SCALE
        Scale of the webpage rendering. default 1 
    --emulateScreen
        Changes the CSS media type of the page to 'screen', default is 'print'.
    --displayHeaderFooter
        Display header and footer. default false.
    --headerTemplate=HTML
        HTML template for the print header. Should be valid HTML markup with 
        following classes used to inject printing values into them: 'date' 
        formatted print date, 'title' document title, 'url document location,
        'pageNumber' current page number, 'totalPages' total pages in the 
        document.
    --footerTemplate=HTML
        HTML template for the print footer. Should be valid HTML markup with 
        following classes used to inject printing values into them: 'date' 
        formatted print date, 'title' document title, 'url document location,
        'pageNumber' current page number, 'totalPages' total pages in the 
        document.
    --loglevel=LOGLEVEL
        Set loglevel, possible loglevels are: debug, info, error, fatal, off. 
        Default is info.
    --logfile=LOGFILE
        Set name and path to the logfile. Default is html2pdf.log.

Exit-Codes:
    - In case of success: 0
    - In case of error: 1
`;

        if (typeof args.help != "undefined" || typeof args.html == "undefined" || typeof args.pdf == "undefined") {
            console.log(help);
            process.exit();
        }

        if (typeof args.loglevel == "undefined") args.loglevel = "info";
        if (typeof args.logfile == "undefined") args.logfile = "html2pdf.log";

        log4js.configure({
            appenders: {
                html2pdflog: { type: 'file', filename: args.logfile },
                out: { type: 'stdout' }
            },
            categories: {
                default: { appenders: ['out', 'html2pdflog'], level: args.loglevel }
            },
        });

        var result = false;
        result = await html2PdfLib.convertHtml(args.html, args.css, args.pdf, args.scale,
            args.displayHeaderFooter, args.headerTemplate, args.footerTemplate, args.printBackground,
            args.landscape, args.pageRanges, args.format, args.width, args.height, args.margintop,
            args.marginright, args.marginbottom, args.marginleft, args.emulateScreen);

        result ? process.exitCode = 0 : process.exitCode = 1;

    } catch (e) {
        logger.error(e);
        process.exitCode = 1;
    }
    
})();