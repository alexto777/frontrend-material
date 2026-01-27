import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estudiante } from '../models/estudiante.model';
import { CreateEstudiante } from '../models/create-estudiante.model';


@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {
  private apiUrl = 'http://localhost:56548/api/Estudiantes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.apiUrl);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  create(estudiante: CreateEstudiante) {
    return this.http.post<Estudiante>(
      'http://localhost:56548/api/Estudiantes',
      estudiante
    );
  }

  update(id: number, data: { nombre: string }) {
  return this.http.put(
    `${this.apiUrl}/${id}`,
    data
  );
}

}
