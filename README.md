# Catenis Cipher

Node.js module used to generate functions used by Catenis to cipher and decipher data.

## Installation

```shell
npm install git+ssh://git@bitbucket.org:blockchainofthings/catenis-cipher.git
```

## Usage

### Instantiate the Catenis cipher object

```javascript
const CatenisCipher = require('catenis-cipher');

const ctnCipher = new CatenisCipher();
```

### Generate cipher functions

```javascript
const cipherFuncs = ctnCipher.genCipherFunctions(password);
```

### Cipher and decipher data

```javascript
const data = 'Sample data to cipher';

// Cipher data
const cipheredData = cipherFuncs.cipher(data);

// Decipher data
const plainData = cipherFuncs.decipher(cipherdData);
```

## License

This project is for Blockchain of Things' internal use only.

Copyright © 2020, Blockchain of Things Inc.