export class Usuario {
  constructor(
    public id: string,
    public nombre: string = "sin-nombre",
    public sala: string = "sin-sala"
  ) {}
}
