const WebSocket = require("ws");

// crear el servidor (iniciarlo)
var miservidor = new WebSocket.Server( {port:8080}, 
    // cuando se inicie... saluda
    ()=>{
       console.log("Servidor iniciado en el puerto 8080");
    }
 );

 var listaDeConexiones=[];

 // cuando el servidor recibe una conexion nueva
 miservidor.on("connection", 
   // que hacer con esa conexión
   (alguien)=>{

      listaDeConexiones.push(alguien);
      console.log("alguien se ha conectado. ya somos "+listaDeConexiones.length);

      var saludo={
         mensaje: "Hola",
         hora: 0
      }
      alguien.send(JSON.stringify(saludo));   // enviarle algo a esa conexión

      // cuando por esa conexión me llegue algún mensaje
      alguien.on("message", 
         // que hago con ese mensaje...
         (datos)=>{
            // mostrar en consola el mensaje
            console.log(datos.toString());
            // a todos los conectados...
            for (var indice=0; indice<listaDeConexiones.length; indice++) {
               // reenviarles el mensaje
               listaDeConexiones[indice].send(datos.toString());
            }
         }
       )

       // cuando esa conexión, se cierre
      alguien.on("close", 
         ()=>{
            console.log("alguien se ha desconectado");
         }
      )

   }
 )



 