function encriptar(texto) {
  return texto
    .replace(/0/g, '#0')
    .replace(/1/g, '#1')
    .replace(/2/g, '#2')
    .replace(/3/g, '#3')
    .replace(/4/g, '#4')
    .replace(/5/g, '#5')
    .replace(/6/g, '#6')
    .replace(/7/g, '#7')
    .replace(/8/g, '#8')
    .replace(/9/g, '#9')
    .replace(/a/g, '8a')
    .replace(/A/g, '8A')
    .replace(/e/g, '3e')
    .replace(/E/g, '3E')
    .replace(/i/g, '1i')
    .replace(/I/g, '1I')
    .replace(/o/g, '7o')
    .replace(/O/g, '7O')
    .replace(/u/g, '2u')
    .replace(/U/g, '2U');
}

function desencriptar(texto) {
  return texto
    .replace(/8a/g, 'a')
    .replace(/8A/g, 'A')
    .replace(/3e/g, 'e')
    .replace(/3E/g, 'E')
    .replace(/1i/g, 'i')
    .replace(/1I/g, 'I')
    .replace(/7o/g, 'o')
    .replace(/7O/g, 'O')
    .replace(/2u/g, 'u')
    .replace(/2U/g, 'U')
    .replace(/#0/g, '0')
    .replace(/#1/g, '1')
    .replace(/#2/g, '2')
    .replace(/#3/g, '3')
    .replace(/#4/g, '4')
    .replace(/#5/g, '5')
    .replace(/#6/g, '6')
    .replace(/#7/g, '7')
    .replace(/#8/g, '8')
    .replace(/#9/g, '9');
}

function encriptarYInvertir() {
  const input = document.getElementById('texto').value;
  const encriptado = encriptar(input);
  const invertido = encriptado.split('').reverse().join('');
  document.getElementById('resultado').textContent = invertido;
}

function desencriptarYInvertir() {
  const input = document.getElementById('texto').value;
  const revertido = input.split('').reverse().join('');
  const desencriptado = desencriptar(revertido);
  document.getElementById('resultado').textContent = desencriptado;
}
