const crypto = require('crypto');
const fs = require('fs');

const publicKeyBase64 = 'ATuU5ZkjMTstT1NgzXvV17oDf0I8l6ytsAeK7LTdozM=';
const token = process.argv[2];
const keyId = process.argv[3];

// Use raw RSA encryption
const publicKey = crypto.createPublicKey({
  key: Buffer.from(publicKeyBase64, 'base64'),
  type: 'spki',
  format: 'der'
});

const encrypted = crypto.publicEncrypt(
  {
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: 'sha256'
  },
  Buffer.from(token)
);

console.log(encrypted.toString('base64'));
