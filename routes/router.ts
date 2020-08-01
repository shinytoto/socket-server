import { Router, Request, Response } from "express";
import Server from "../classes/server";
import { usuariosConectados } from "../sockets/socket";

const router = Router();

router.get("/mensajes", (req: Request, res: Response) => {
  res.json({
    ok: "true",
    mensaje: "Éxito!",
  });
});

// Enviar mensajes privados

router.post("/mensajes/:id", (req: Request, res: Response) => {
  const body = req.body;
  const id = req.params.id;

  const cuerpo = body.mensaje;
  const de = body.usuario;

  const payload = {
    de,
    cuerpo,
  };

  const server = Server.instance;

  server.io.in(id).emit("mensaje-privado", payload);

  res.json({
    ok: "true",
    cuerpo,
    de,
    id,
  });
});

// Enviar mensajes globales

router.post("/mensaje-global/:id", (req: Request, res: Response) => {
  const body = req.body;
  const id = req.params.id;

  const cuerpo = body.mensaje;
  const de = body.usuario;

  const payload = {
    de,
    cuerpo,
  };

  const server = Server.instance;

  server.io.emit("mensaje-global", payload);

  res.json({
    ok: "true",
    cuerpo,
    de,
    id,
  });
});

// Obtener IDs de los usuarios

router.get("/usuarios", (req: Request, res: Response) => {
  const server = Server.instance;

  server.io.clients((err: any, clients: string[]) => {
    if (err)
      return res.json({
        ok: false,
        err: err,
      });

    res.json({
      ok: true,
      clients,
    });
  });
});

// Obtener usuarios y sus nombres

router.get("/usuarios/detalle", (req: Request, res: Response) => {
  res.json({
    ok: true,
    clients: usuariosConectados.getLista(),
  });
});

export default router;
