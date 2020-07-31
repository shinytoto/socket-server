import { Router, Request, Response } from "express";
import Server from "../classes/server";

const router = Router();

router.get("/mensajes", (req: Request, res: Response) => {
  res.json({
    ok: "true",
    mensaje: "Éxito!",
  });
});

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

export default router;
