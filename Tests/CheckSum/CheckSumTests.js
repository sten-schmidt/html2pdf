"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CheckSum_1 = require("../../Tools/CheckSum");
describe('CheckSumTests', () => {
    it('Test Simple Strings', () => {
        let value = new CheckSum_1.CheckSum().getCheckSum('', 'sha1', 'hex');
        expect(value).toBe('da39a3ee5e6b4b0d3255bfef95601890afd80709');
    });
});
//# sourceMappingURL=CheckSumTests.js.map