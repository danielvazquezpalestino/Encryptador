const { createServer } = require('node:http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3001;

const server = createServer(
    function (req, res) {
        if (req.url === '/index.css') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/css');
            fs.readFile('index.css', (err, data) => {
                if (err) {
                    res.statusCode = 404;
                    res.end('CSS not found');
                } else {
                    res.end(data);
                }
            });
            return;
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        let html =
        '<html>' +
        '<head>' +
        '  <title>Arquitectura de sotfware </title>' +
        '  <link rel="stylesheet" href="index.css">' +
        '</head>' +
        '<body>' +
        '  <div class="container">' +
        '    <h1>Aplicaciones web</h1>' +
        '    <h6>25 de Septiembre de 2024</h6>' +
        '    <h2>Introducci&oacute;n a NodeJS</h2>' +
        '    <h3>Crear archivo servidor (server.js)</h3>' +
        '    <pre>C:\Users 2024Athlon_Dev\j13>echo. > server.js</pre>' +
        '    <h3>C&oacute;digo del servidor HTTP b&aacute;sico</h3>' +
        '    <pre>// Requerir el m&oacute;dulo HTTP nativo de Node.js</pre>' +
        '    <pre>const http = require(\'http\');</pre>' +
        '    <pre></pre>' +
        '    <pre>// Crear el servidor</pre>' +
        '    <pre>const server = http.createServer((req, res) => {</pre>' +
        '    <pre>  res.writeHead(200, {\'Content-Type\': \'text/html; charset=utf-8\'});</pre>' +
        '    <pre>  res.end(\'&lt;h1&gt;¡Hola desde Node.js!&lt;/h1&gt;\');</pre>' +
        '    <pre>});</pre>' +
        '    <pre></pre>' +
        '    <pre>// Definir puerto y iniciar servidor</pre>' +
        '    <pre>const PORT = 3000;</pre>' +
        '    <pre>server.listen(PORT, () => {</pre>' +
        '    <pre>  console.log(`Servidor corriendo en http://localhost:${PORT}`);</pre>' +
        '    <pre>});</pre>' +
        '    <h3>Ejecutar el servidor</h3>' +
        '    <pre>C:\Users 2024Athlon_Dev\j13>node server.js</pre>' +
        '    <pre>Servidor corriendo en http://localhost:3000</pre>' +
        '    <h3>Probar en el navegador</h3>' +
        '    <pre>Abrir navegador y visitar: http://localhost:3000</pre>' +
        '    <pre>Resultado: ¡Hola desde Node.js!</pre>' +
        '    <h3>Detener el servidor</h3>' +
        '    <pre>Presionar Ctrl + C en la terminal</pre>' +
        '    <pre>C:\Users 2024Athlon_Dev\j13></pre>' +
        '  </div>' +
        '</body>' +
        '</html>';
        res.end(html);
    }
);

server.listen(port, hostname, () => {
 console.log(`Server running at http://${hostname}:${port}/`);
 //console.log(`El Servidor Corriendo` );
});

