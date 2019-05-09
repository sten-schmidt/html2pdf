"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
class CheckSum {
    getCheckSum(str, algorithm, encoding) {
        return crypto
            .createHash(algorithm || 'md5')
            .update(str, 'utf8')
            .digest(encoding || 'hex');
    }
}
exports.CheckSum = CheckSum;
//# sourceMappingURL=CheckSum.js.map