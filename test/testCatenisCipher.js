const expect = require('chai').expect;
const CatenisCipher = require('../index');

describe('Catenis Cipher', function () {
    describe('Cipher functions with default salt', function () {
        const ctnCipher = new CatenisCipher();
        const psw = '123456';
        const testData = [
            'Test data #1',
            Buffer.from('Test data #2')
        ];

        it('should successfully cipher data from string', function () {
            const cipherFuncs = ctnCipher.genCipherFunctions(psw);
            const cipherData = cipherFuncs.cipher(testData[0]);
            const plainData = cipherFuncs.decipher(cipherData);

            expect(plainData.toString()).to.equal(testData[0]);
        });

        it('should successfully cipher data from buffer', function () {
            const cipherFuncs = ctnCipher.genCipherFunctions(psw);
            const cipherData = cipherFuncs.cipher(testData[1]);
            const plainData = cipherFuncs.decipher(cipherData);

            expect(plainData).to.deep.equal(testData[1]);
        });

        it('should successfully decipher data from string', function () {
            const cipherFuncs = ctnCipher.genCipherFunctions(psw);
            const cipherData = cipherFuncs.cipher(testData[0]);
            const plainData = cipherFuncs.decipher(cipherData.toString('base64'));

            expect(plainData.toString()).to.equal(testData[0]);
        });
    });

    describe('Cipher functions with custom salt', function () {
        const ctnCipher = new CatenisCipher('This is my test salt');
        const psw = '654321';
        const testData = [
            'Test data #1',
            Buffer.from('Test data #2')
        ];

        it('should successfully cipher data from string', function () {
            const cipherFuncs = ctnCipher.genCipherFunctions(psw);
            const cipherData = cipherFuncs.cipher(testData[0]);
            const plainData = cipherFuncs.decipher(cipherData);

            expect(plainData.toString()).to.equal(testData[0]);
        });

        it('should successfully cipher data from buffer', function () {
            const cipherFuncs = ctnCipher.genCipherFunctions(psw);
            const cipherData = cipherFuncs.cipher(testData[1]);
            const plainData = cipherFuncs.decipher(cipherData);

            expect(plainData).to.deep.equal(testData[1]);
        });

        it('should successfully decipher data from string', function () {
            const cipherFuncs = ctnCipher.genCipherFunctions(psw);
            const cipherData = cipherFuncs.cipher(testData[0]);
            const plainData = cipherFuncs.decipher(cipherData.toString('base64'));

            expect(plainData.toString()).to.equal(testData[0]);
        });
    });
});