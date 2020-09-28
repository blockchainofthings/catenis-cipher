/**
 * Created by claudio on 2020-09-28
 */

const crypto = require('crypto');

class CatenisCipher {
    /**
     * Class constructor
     * @param {String|Buffer} [salt] Data to be used to derive (along with the supplied password) the cipher key
     */
    constructor (salt) {
        this.salt = salt != null ? Buffer.from(salt) : Buffer.from('FMo7uGuHjJv0b9KI5VPqyA==', 'base64');
    }

    /**
     * Generate cipher/decipher functions
     * @param password Password used for ciphering/deciphering data
     * @return {{cipher: function(Buffer|any): Buffer, decipher: function(Buffer|String): Buffer}}
     */
    genCipherFunctions(password) {
        const key = crypto.scryptSync(password, this.salt, 24);

        return {
            /**
             * Cipher data
             * @param {Buffer|any} data Data to cipher. Should be a Buffer or of a type that can be converted
             *                           into a Buffer, like String, Array, and BufferArray
             * @return {Buffer} The ciphered data
             */
            cipher(data) {
                    const iv = crypto.randomBytes(16);
                    const cipher = crypto.createCipheriv('aes-192-cbc', key, iv);

                    if (!Buffer.isBuffer(data)) {
                    data = Buffer.from(data);
                }

                return Buffer.concat([iv, cipher.update(data), cipher.final()]);
            },
            /**
             * Decipher data
             * @param {Buffer|String} data Data to decipher. If a String is passed, it is assumed to be base64 encoded
             * @return {Buffer} The deciphered data
             */
            decipher(data) {
                if (!Buffer.isBuffer(data)) {
                    data = Buffer.from(data, 'base64');
                }

                const iv = data.slice(0, 16);
                const decipher = crypto.createDecipheriv('aes-192-cbc', key, iv);

                return Buffer.concat([decipher.update(data.slice(16)), decipher.final()]);
            }
        };
    }
}

module.exports = CatenisCipher;