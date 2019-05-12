"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CheckSum_1 = require("../../Tools/CheckSum");
describe('CheckSumTests', () => {
    it('Calc from EmptyString', () => {
        let value = new CheckSum_1.CheckSum().getCheckSum('', 'sha1', 'hex');
        expect(value).toBe('da39a3ee5e6b4b0d3255bfef95601890afd80709');
    });
    it('Calc from Letter A', () => {
        let value = new CheckSum_1.CheckSum().getCheckSum('A', 'sha1', 'hex');
        expect(value).toBe('6dcd4ce23d88e2ee9568ba546c007c63d9131c1b');
    });
    it('Calc from Letter B', () => {
        let value = new CheckSum_1.CheckSum().getCheckSum('a', 'sha1', 'hex');
        expect(value).toBe('86f7e437faa5a7fce15d1ddcb9eaeaea377667b8');
    });
});
//# sourceMappingURL=CheckSumTests.js.map