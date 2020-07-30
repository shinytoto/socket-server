import { Router, Request, Response } from "express";

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

  const mensaje = body.mensaje;
  const usuario = body.usuario;

  res.json({
    ok: "true",
    mensaje,
    usuario,
    id,
  });
});

export default router;
