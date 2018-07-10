/**
 * @name Html2PdfLib
 * @description Html2PdfLib - A simple HTML to PDF converter using node and puppeteer
 * @author Sten Schmidt
 * @version 1.0
 */

'use strict';

const puppeteer = require('puppeteer');
const log4js = require('@log4js-node/log4js-api');
const logger = log4js.getLogger('Html2PdfLib');
const path = require('path');
const fileUrl = require('file-url');

module.exports = {

    /**
     * Resolves a relative to a absolute path. Optional to File-URL
     * @param {string} filePath
     * @param {boolean} toFileUrl
     */
    resolvePath: function (filePath, toFileUrl) {
        var result = filePath;
        if (typeof toFileUrl == "undefined") toFileUrl = false;

        if (!path.isAbsolute(filePath) &&
            !filePath.toLowerCase().startsWith('http')) {
            result = path.resolve(filePath);
            if (toFileUrl) result = fileUrl(result);
        }

        return result;
    },

    /**
    * Convert Html to PDF
    * @param {string} html
    * @param {string} css
    * @param {string} pdf
    * @param {number} scale
    * @param {boolean} displayHeaderFooter
    * @param {string} headerTemplate
    * @param {string} footerTemplate
    * @param {boolean} printBackground
    * @param {boolean} landscape
    * @param {string} pageRanges
    * @param {string} format
    * @param {string} width
    * @param {string} height
    * @param {string} margintop
    * @param {string} marginright
    * @param {string} marginbottom
    * @param {string} marginleft
    * @param {boolean} emulateScreen
    */
    convertHtml: async function (html, css, pdf, scale, displayHeaderFooter, headerTemplate, footerTemplate,
        printBackground, landscape, pageRanges, format, width, height,
        margintop, marginright, marginbottom, marginleft, emulateScreen) {

        var result = false;
        if (!html) throw new Error("The html-parameter must not be empty!");
        if (!pdf) throw new Error("The pdf-parameter must not be empty!");

        let browser;

        try {

            /*
             * set default configuration
             */

            if (typeof format == "undefined") format = "A4";
            if (typeof landscape == "undefined") landscape = false;
            if (typeof scale == "undefined") scale = 1;
            if (typeof displayHeaderFooter == "undefined") displayHeaderFooter = false;
            if (typeof printBackground == "undefined") printBackground = false;

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

            if (typeof headerTemplate != "undefined") pdfOptions.headerTemplate = headerTemplate;
            if (typeof footerTemplate != "undefined") pdfOptions.footerTemplate = footerTemplate;
            if (typeof pageRanges != "undefined") pdfOptions.pageRanges = pageRanges;
            if (typeof width != "undefined") pdfOptions.width = width;
            if (typeof height != "undefined") pdfOptions.height = height;

            var margin = {};
            if (typeof margintop != "undefined") margin.top = margintop;
            if (typeof marginright != "undefined") margin.right = marginright;
            if (typeof marginbottom != "undefined") margin.bottom = marginbottom;
            if (typeof marginleft != "undefined") margin.left = marginleft;

            if ((margintop + marginright + marginbottom + marginleft).length > 0) {
                pdfOptions.margin = margin;
            }

            browser = await puppeteer.launch();
            const page = await browser.newPage();

            if (typeof emulateScreen != "undefined" && emulateScreen == true) {
                logger.debug('emulateMedia: screen instead of print');
                page.emulateMedia('screen');
            }

            html = this.resolvePath(html, true);
            
            logger.debug('loading page: ' + html);
            await page.goto(html, {
                waitUntil: 'networkidle2'
            });

            if (typeof css != "undefined" && css.length > 0) {
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

            if (browser != "undefined") {
                await browser.close();
                logger.debug('finally browser.closed')
            }
        }

        return result;
    }
};