/*
https://www.w3schools.com/nodejs/ref_modules.asp
https://www.w3schools.com/nodejs/ref_crypto.asp
*/
const crypto = require('crypto');

const key = crypto.scryptSync('mypassword', 'salt', 16); // 16 bytes para AES-128
const iv = Buffer.alloc(16, 0); // IV de 16 bytes (puedes usar otro valor aleatorio)

const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
let encrypted = cipher.update('abc', 'utf8', 'hex');
encrypted += cipher.final('hex');

console.log(encrypted);