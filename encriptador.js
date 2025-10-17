function encriptar() {
  const texto = document.getElementById("texto").value.trim();
  const clave = document.getElementById("clave").value;
  const resultado = document.getElementById("resultado");

  resultado.textContent = ""; // limpia resultado previo

  if (!texto) {
    resultado.textContent = "❗ Ingresa el texto a cifrar.";
    return;
  }

  if (!clave) {
    resultado.textContent = "❗ Ingresa la clave de cifrado.";
    return;
  }

  // Cifrado simétrico con AES
  try {
    const cifrado = CryptoJS.AES.encrypt(texto, clave).toString();
    resultado.textContent = "🔒 Texto cifrado:\n" + cifrado;
  } catch (err) {
    resultado.textContent = "❌ Error al cifrar: " + (err.message || err);
  }
}

function desencriptar() {
  const texto = document.getElementById("texto").value.trim();
  const clave = document.getElementById("clave").value;
  const resultado = document.getElementById("resultado");

  resultado.textContent = ""; // limpia resultado previo

  if (!texto) {
    resultado.textContent = "❗ Ingresa el texto cifrado para descifrar.";
    return;
  }

  if (!clave) {
    resultado.textContent = "❗ Ingresa la clave para descifrar.";
    return;
  }

  try {
    // Descifrado simétrico con AES
    const bytes = CryptoJS.AES.decrypt(texto, clave);
    const textoDescifrado = bytes.toString(CryptoJS.enc.Utf8);

    if (!textoDescifrado) throw new Error("Clave incorrecta o texto inválido.");

    resultado.textContent = "🔓 Texto descifrado:\n" + textoDescifrado;
  } catch (error) {
    resultado.textContent = "❌ Error al descifrar: " + (error.message || error);
  }
}