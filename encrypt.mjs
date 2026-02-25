import { createPublicKey } from 'crypto';
import { readFileSync } from 'fs';

const publicKeyBase64 = 'ATuU5ZkjMTstT1NgzXvV17oDf0I8l6ytsAeK7LTdozM=';
const token = process.argv[2];

const publicKey = createPublicKey({
  key: Buffer.from(publicKeyBase64, 'base64'),
  type: 'spki',
  format: 'der'
});

const encrypted = publicKey.encrypt(token, 'RSA-OAEP');
console.log(encrypted.toString('base64'));
