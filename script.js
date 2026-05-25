const enc = new TextEncoder();
const dec = new TextDecoder();

// ===== CIFRADO SIMÉTRICO (AES-GCM) =====
let datosAES = {};

async function encriptarAES() {
  const msg = document.getElementById('msgSim').value;
  const pass = document.getElementById('passSim').value;
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const keyMaterial = await crypto.subtle.importKey("raw", enc.encode(pass), {name:"PBKDF2"}, false, ["deriveKey"]);
  const key = await crypto.subtle.deriveKey(
    {name:"PBKDF2", salt: iv, iterations:100000, hash:"SHA-256"},
    keyMaterial,
    {name:"AES-GCM", length:256},
    true,
    ["encrypt","decrypt"]
  );

  const cifrado = await crypto.subtle.encrypt({name:"AES-GCM", iv}, key, enc.encode(msg));
  datosAES = {iv, cifrado};
  document.getElementById('outSim').textContent = "🔒 Texto cifrado (Base64):\n" +
    btoa(String.fromCharCode(...new Uint8Array(cifrado)));
}

async function desencriptarAES() {
  if (!datosAES.cifrado) return alert("Primero cifra un mensaje.");
  const pass = document.getElementById('passSim').value;
  const keyMaterial = await crypto.subtle.importKey("raw", enc.encode(pass), {name:"PBKDF2"}, false, ["deriveKey"]);
  const key = await crypto.subtle.deriveKey(
    {name:"PBKDF2", salt: datosAES.iv, iterations:100000, hash:"SHA-256"},
    keyMaterial,
    {name:"AES-GCM", length:256},
    true,
    ["encrypt","decrypt"]
  );
  try {
    const decifrado = await crypto.subtle.decrypt({name:"AES-GCM", iv:datosAES.iv}, key, datosAES.cifrado);
    document.getElementById('outSim').textContent = "✅ Texto descifrado:\n" + dec.decode(decifrado);
  } catch {
    document.getElementById('outSim').textContent = "❌ Contraseña incorrecta o datos dañados.";
  }
}

// ===== CIFRADO ASIMÉTRICO (RSA-OAEP) =====
let clavePublica, clavePrivada, cifradoRSA;

async function generarRSA() {
  const kp = await crypto.subtle.generateKey(
    {name:"RSA-OAEP", modulusLength:2048, publicExponent:new Uint8Array([1,0,1]), hash:"SHA-256"},
    true,
    ["encrypt","decrypt"]
  );
  clavePublica = kp.publicKey;
  clavePrivada = kp.privateKey;
  document.getElementById('outRSA').textContent = "🔑 Claves generadas correctamente.";
}

async function encriptarRSA() {
  if (!clavePublica) return alert("Primero genera las claves.");
  const msg = document.getElementById('msgRSA').value;
  const cifrado = await crypto.subtle.encrypt({name:"RSA-OAEP"}, clavePublica, enc.encode(msg));
  cifradoRSA = cifrado;
  document.getElementById('outRSA').textContent = "🔒 Texto cifrado (Base64):\n" +
    btoa(String.fromCharCode(...new Uint8Array(cifrado)));
}

async function desencriptarRSA() {
  if (!cifradoRSA || !clavePrivada) return alert("Primero cifra un mensaje con RSA.");
  const decifrado = await crypto.subtle.decrypt({name:"RSA-OAEP"}, clavePrivada, cifradoRSA);
  document.getElementById('outRSA').textContent = "✅ Texto descifrado:\n" + dec.decode(decifrado);
}

// ===== FUNCIONES DE HASHING =====
function rotarIzquierda8(x, r) {
  return ((x << r) & 0xff) | (x >>> (8 - r));
}

function mezclarBytes(datosBytes, rondas) {
  const estado = new Uint8Array(16).fill(0x42);

  for (let r = 0; r < rondas; r++) {
    // Mezcla de bytes
    for (let i = 0; i < datosBytes.length; i++) {
      const byte = datosBytes[i];
      const indice = i % estado.length;
      estado[indice] ^= byte;
      estado[indice] = (estado[indice] + (byte ^ r) + indice) & 0xff;
      estado[indice] = rotarIzquierda8(estado[indice], (byte + r + indice) % 8);
    }

    // Mezcla adicional del estado
    const temporal = new Uint8Array(estado.length);
    for (let i = 0; i < estado.length; i++) {
      temporal[i] = (estado[(i * 3) % estado.length] ^ (r + i)) & 0xff;
    }
    for (let i = 0; i < estado.length; i++) estado[i] = temporal[i];
  }
  return estado;
}

function textoABytes(texto) {
  const codificador = new TextEncoder();
  return codificador.encode(texto);
}

function bytesAHex(bytes) {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

function generarHash(texto) {
  const datosBytes = textoABytes(texto);
  const bytesDigest = mezclarBytes(datosBytes, 4); // Usamos 4 rondas fijas
  return bytesAHex(bytesDigest);
}

// Función para generar y mostrar el hash
function generarYMostrarHash() {
  const texto = document.getElementById('entradaTexto').value || '';
  try {
    const hash = generarHash(texto);
    document.getElementById('salidaHash').textContent = hash;
  } catch (e) {
    console.error('Error al generar el hash:', e);
    document.getElementById('salidaHash').textContent = 'Error al generar el hash';
  }
}

// Inicialización de eventos
window.addEventListener('DOMContentLoaded', () => {
  // Evento para el botón de copiar hash
  document.getElementById('btnCopiarHash').addEventListener('click', async () => {
    const texto = document.getElementById('salidaHash').textContent;
    if (texto && texto !== '(aún no generado)') {
      try {
        await navigator.clipboard.writeText(texto);
        alert('Hash copiado al portapapeles');
      } catch (err) {
        console.error('Error al copiar:', err);
        prompt('No se pudo copiar automáticamente. Por favor, copia manualmente:', texto);
      }
    }
  });
});
