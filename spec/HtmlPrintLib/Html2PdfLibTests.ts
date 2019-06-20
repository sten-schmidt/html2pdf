﻿import path = require('path');
import fs = require('fs');
import { CheckSum } from '../../Tools/CheckSum';
import { PdfTools } from '../../Tools/PdfTools';

describe('Html2PdfLib', () => {
    it('example1_More_CSS', async () => {

        var html = path.resolve(__dirname, '../..', 'TestInput', 'Example1', 'index.html');
        var css = path.resolve(__dirname, '../..', 'TestInput', 'Example1', 'more.css');
        var pdf = path.resolve(__dirname, '../..', 'TestOutput', 'example1_More_CSS.pdf');

        //Cleanup
        if (fs.existsSync(pdf)) fs.unlinkSync(pdf);
        expect(fs.existsSync(pdf)).toBeFalsy();

        const html2PdfLib = require('../../Html2PdfLib');
        const result = await html2PdfLib.convertHtml(html, css, pdf);

        expect(result).toBe(true);

        var checksum = new CheckSum();
        var chksum = checksum.getCheckSum(PdfTools.ReadFileWithoutDateFlags(pdf), 'sha1', 'hex');
        expect(chksum).toBe("47648a600cc82a60c504020d995019788181b051");

    });

    it('example1_No_seperate_CSS', async () => {

        var html = path.resolve(__dirname, '../..', 'TestInput', 'Example1', 'index.html');
        var pdf = path.resolve(__dirname, '../..', 'TestOutput', 'example1_No_seperate_CSS.pdf');

        //Cleanup
        if (fs.existsSync(pdf)) fs.unlinkSync(pdf);
        expect(fs.existsSync(pdf)).toBeFalsy();

        const html2PdfLib = require('../../Html2PdfLib');
        const result = await html2PdfLib.convertHtml(html, undefined, pdf);

        expect(result).toBe(true);

        var checksum = new CheckSum();
        var chksum = checksum.getCheckSum(PdfTools.ReadFileWithoutDateFlags(pdf), 'sha1', 'hex');
        expect(chksum).toBe("1902cdaba32a48690346c8b369aafa8ec7664172");

    });

    it('example2_viewport', async () => {

        var html = path.resolve(__dirname, '../..', 'TestInput', 'Example2', 'viewport.html');
        var pdf = path.resolve(__dirname, '../..', 'TestOutput', 'example2_viewport.pdf');

        //Cleanup
        if (fs.existsSync(pdf)) fs.unlinkSync(pdf);
        expect(fs.existsSync(pdf)).toBeFalsy();

        const html2PdfLib = require('../../Html2PdfLib');
        const result = await html2PdfLib.convertHtml(html, undefined, pdf, undefined, undefined, undefined
            , undefined, undefined, true);

        expect(result).toBe(true);
        
        var checksum = new CheckSum();
        var chksum = checksum.getCheckSum(PdfTools.ReadFileWithoutDateFlags(pdf), 'sha1', 'hex');
        expect(chksum).toBe("5161c36a766396f13d4f0914352e142b5f202d87");

    });
});