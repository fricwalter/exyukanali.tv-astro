const crypto = require('crypto');
const publicKey = 'ATuU5ZkjMTstT1NgzXvV17oDf0I8l6ytsAeK7LTdozM=';

function encrypt(plaintext) {
  const keyBuffer = Buffer.from(publicKey, 'base64');
  const encrypted = crypto.publicEncrypt(
    {
      key: keyBuffer,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256'
    },
    Buffer.from(plaintext)
  );
  return encrypted.toString('base64');
}

// Token
const token = process.argv[2];
console.log(encrypt(token));
