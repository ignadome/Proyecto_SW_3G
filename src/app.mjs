import { notFound, estatico } from "./controladores.mjs";
import { baseUrl } from './config.mjs';

export function requestListener(req, res) {
    let handler = null;

    // procesa URLs que hacen referencia a ficheros / directorios que están dentro del directorio static
    if (estatico(req, res)) {
        return;
    }

    const url = new URL(`${baseUrl}${req.url}`);
    const path = url.pathname;
    switch(path) {
        case "/saludos":
            handler = saludo;
            break;    
        default:
            handler = notFound;
            break;
    }
    handler(req, res);
}


/*function saludo(req, res) {
    const url = new URL(`${baseUrl}${req.url}`);
    const params = url.searchParams;
    const numParam = params.get("num") || 0;
    const num = parseInt(numParam);
    let saludo = "";
    if(num!=42)
    {
        for (let i = 0; i < num; i++) {
            saludo += `<p>${i} - ¡Hola Mundo!</p>`;
        }
        res.setHeader("Content-Type", "text/html;charset=utf-8");
        res.writeHead(200);
        res.end(`<!DOCTYPE html>
    <html>
        <head><title>Hola NodeJS</title></head>
        <body>
        <h1>¿No te ha quedado claro el saludo?</h1>
        ${saludo}
        </body>
    </html>`);
    }
    else{
        res.setHeader("Content-Type", "text/html;charset=utf-8");
        res.writeHead(200);
        res.end(`<!DOCTYPE html>
     <html>
        <head><title>Hola NodeJS</title></head>
        <body>
        <h1>Me has pedido que te salude 42 veces</h1>
        <p>Pulsa en <a href="/">inicio</a> para volver al principio</p>
        <p>En realidad, esa es la pregunta final sobre <b>la vida, el universo y todo lo demás.</b></p>
        
       
        </body>
    </html>`);
    }
   

};
*/