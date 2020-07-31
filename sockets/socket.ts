import { Socket } from "socket.io";
import socketIO from "socket.io";
import { UsuariosLista } from "../classes/usuarios-lista";
import { Usuario } from "../classes/usuario";

export const usuariosConectados = new UsuariosLista();

// Conectar cliente
export const conectarClient = (client: Socket) => {
  const usuario = new Usuario(client.id);

  usuariosConectados.agregar(usuario);
};

// Escuchar mensajes
export const mensaje = (client: Socket, io: socketIO.Server) => {
  client.on("mensaje", (payload: { de: string; cuerpo: string }) => {
    console.log("Mensaje recibido", payload);

    io.emit("mensaje-nuevo", payload);
  });
};

// Escuchar configuración de usuario
export const configurarUsuario = (client: Socket, io?: SocketIO.Server) => {
  client.on(
    "configurar-usuario",
    (payload: { nombre: string }, callback: CallableFunction) => {
      usuariosConectados.actualizarNombre(client.id, payload.nombre);

      // ! //
      callback({
        ok: true,
        mensaje: `Usuario ${payload.nombre}, configurado`,
      });
    }
  );
};

// Desconectar
export const desconectar = (client: Socket) => {
  client.on("disconnect", () => {
    console.log("Cliente desconectado.");

    usuariosConectados.borrarUsuario(client.id);
  });
};
