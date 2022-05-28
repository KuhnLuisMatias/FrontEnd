export class Skill {
  id: number;
  link: String;
  nivel: number;
  nombre: String;
  descripcion: String;
  porcentaje: number;

  constructor() {
    this.id = 0;
    this.porcentaje = 0;
    this.nombre = "";
    this.descripcion = "";
  }
}
