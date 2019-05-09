import path = require('path');
import fs = require('fs');
import crypto = require('crypto');

class CheckSum {

    getCheckSum(str, algorithm, encoding) {
        return crypto
            .createHash(algorithm || 'md5')
            .update(str, 'utf8')
            .digest(encoding || 'hex')
    }
}

export { CheckSum };