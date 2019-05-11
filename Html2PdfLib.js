// @ts-check

/**
 * @name Html2PdfLib
 * @description Html2PdfLib - A simple HTML to PDF converter using node and puppeteer
 * @author Sten Schmidt
 * @version 1.0
 */

const puppeteer = require('puppeteer');
const log4js = require('@log4js-node/log4js-api');
const logger = log4js.getLogger('Html2PdfLib');
const path = require('path');
const fileUrl = require('file-url');

module.exports = {

    /**
     * Resolves a relative to a absolute path. Optional to File-URL
     * @param {string} filePath a comment
     * @param {boolean} toFileUrl a comment
     * @returns {string} path
     */
    resolvePath: function (filePath, toFileUrl) {
        var result = filePath;
        if (typeof toFileUrl === "undefined") toFileUrl = false;

        if (!path.isAbsolute(filePath) &&
            !filePath.toLowerCase().startsWith('http')) {
            result = path.resolve(filePath);
            if (toFileUrl) result = fileUrl(result);
        }

        return result;
    },

    /**
    * Convert Html to PDF
    * @param {string} html URL to a webressource or path to a local HTML file. URL must start with 'http'. A path to a local file is automatically converted into file:/// syntax.
    * @param {string} css URL to a webressource or path to a local CSS file. Additional CSS styles will applyed before pdf generation. URL must start with 'http'. A path to a local file is automatically converted into file:/// syntax.
    * @param {string} pdf The file path to save the PDF to. If 'pdf' is a relative path, then it is resolved relative to current working directory.
    * @param {number} scale Scale of the webpage rendering. default 1
    * @param {boolean} displayHeaderFooter Display header and footer. default false.
    * @param {string} headerTemplate HTML template for the print header. Should be valid HTML markup with following classes used to inject printing values into them: 'date' formatted print date, 'title' document title, 'url document location, 'pageNumber' current page number, 'totalPages' total pages in the document.
    * @param {string} footerTemplate HTML template for the print footer. Should be valid HTML markup with following classes used to inject printing values into them: 'date' formatted print date, 'title' document title, 'url document location, 'pageNumber' current page number, 'totalPages' total pages in the document. 
    * @param {boolean} printBackground Print background graphics. default false. 
    * @param {boolean} landscape Paper orientation. default false.
    * @param {string} pageRanges Paper ranges to print, e.g., '1-5, 8, 11-13'. Defaults to the empty string, which means print all pages.
    * @param {string} format Paper format, possible values are Letter, Legal, Tabloid, Ledger, A0, A1, A2, A3, A4, A5, A6.  If set, takes priority over width or height options. Defaults to 'A4'.
    * @param {string} width Paper width, accepts values labeled with units, possible units: px, in, cm, mm. 
    * @param {string} height Paper height, accepts values labeled with units, possible units: px, in, cm, mm.
    * @param {string} margintop Top margin, accepts values labeled with units, possible units: px, in, cm, mm.
    * @param {string} marginright Right margin, accepts values labeled with units, possible units: px, in, cm, mm.
    * @param {string} marginbottom Bottom margin, accepts values labeled with units, possible units: px, in, cm, mm.
    * @param {string} marginleft Left margin, accepts values labeled with units, possible units: px, in, cm, mm.
    * @param {boolean} emulateScreen Changes the CSS media type of the page to 'screen', default is 'print'.
    * @param {number} viewportheight Viewport: set page height in pixels
    * @param {number} viewportwith Viewport: set page width in pixels.
    * @returns {Promise<boolean>} Success
    */
    convertHtml: async function (html, css, pdf, scale, displayHeaderFooter, headerTemplate, footerTemplate,
        printBackground, landscape, pageRanges, format, width, height,
        margintop, marginright, marginbottom, marginleft, emulateScreen,
        viewportheight, viewportwith) {

        var result = false;
        if (!html) throw new Error("The html-parameter must not be empty!");
        if (!pdf) throw new Error("The pdf-parameter must not be empty!");

        let browser;

        try {

            /*
             * set default configuration
             */

            if (typeof format === "undefined") format = "A4";
            if (typeof landscape === "undefined") landscape = false;
            if (typeof scale === "undefined") scale = 1;
            if (typeof displayHeaderFooter === "undefined") displayHeaderFooter = false;
            if (typeof printBackground === "undefined") printBackground = false;

            var pdfOptions = {
                path: pdf,
                format: format,
                landscape: landscape,
                scale: scale,
                displayHeaderFooter: displayHeaderFooter,
                printBackground: printBackground,
            };

            /*
             * optional parameters
             */

            if (typeof headerTemplate !== "undefined") pdfOptions.headerTemplate = headerTemplate;
            if (typeof footerTemplate !== "undefined") pdfOptions.footerTemplate = footerTemplate;
            if (typeof pageRanges !== "undefined") pdfOptions.pageRanges = pageRanges;
            if (typeof width !== "undefined") pdfOptions.width = width;
            if (typeof height !== "undefined") pdfOptions.height = height;

            var margin = {};
            if (typeof margintop !== "undefined") margin.top = margintop;
            if (typeof marginright !== "undefined") margin.right = marginright;
            if (typeof marginbottom !== "undefined") margin.bottom = marginbottom;
            if (typeof marginleft !== "undefined") margin.left = marginleft;

            if ((margintop + marginright + marginbottom + marginleft).length > 0) {
                pdfOptions.margin = margin;
            }

            if (typeof viewportheight === "undefined") viewportheight = 1024;
            if (typeof viewportwith === "undefined") viewportwith = 1200;

            browser = await puppeteer.launch({
                headless: true,
                defaultViewport: {
                    height: viewportheight,
                    width: viewportwith
                }
            });

            const page = await browser.newPage();

            if (typeof emulateScreen !== "undefined" && emulateScreen === true) {
                logger.debug('emulateMedia: screen instead of print');
                page.emulateMedia('screen');
            }

            html = this.resolvePath(html, true);
            
            logger.debug('loading page: ' + html);
            await page.goto(html, {
                waitUntil: 'networkidle2'
            });

            if (typeof css !== "undefined" && css.length > 0) {
                logger.info('applying css: ' + css);
                css = this.resolvePath(css, true);
                await page.addStyleTag({
                    url: css
                });
            }

            logger.debug('pdfOptions: ' + JSON.stringify(pdfOptions));
            await page.pdf(pdfOptions);
            result = true;

        } catch (e) {
            logger.error(e);
        } finally {

            if (typeof browser !== "undefined") {
                await browser.close();
                logger.debug('finally browser.closed');
            }
        }

        return result;
    }
};