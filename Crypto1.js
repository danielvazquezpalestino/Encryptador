// https://nodejs.org/docs/latest/api/crypto.html
// SHA-256 significa "algoritmo de hash seguro de 256 bits"
const { createHmac } = require('node:crypto');

const secret = 'appweb3hma2024';
const hash = createHmac('sha256', secret).update('jp12jul94mdp').digest('hex');
console.log(hash);
// Prints:
//   77adc4a6a94ff834400c4532d68a4035c917164d472279e6762ffc1a68306de4