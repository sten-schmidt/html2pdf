import { CheckSum } from '../../Tools/CheckSum';

describe('CheckSumTests', () => {
    it('Test Simple Strings', () => {

        let value = new CheckSum().getCheckSum('', 'sha1', 'hex');
        expect(value).toBe('da39a3ee5e6b4b0d3255bfef95601890afd80709');
    });

});