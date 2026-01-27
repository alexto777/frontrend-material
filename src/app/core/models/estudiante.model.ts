export interface Estudiante {
  id: number;
  nombre: string;
  cantidadNotas: number;
  editando?: boolean;
  nombreEditado?: string;
}
