import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface NotaCreateDto {
  valor: number;
  materia: string;
  estudianteId: number;
  profesorId: number;
}

export interface NotaUpdateDto {
  valor: number;
  materia: string;
  estudianteId: number;
  profesorId: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  private readonly apiUrl = 'http://localhost:56548/api/Notas';

  constructor(private http: HttpClient) {}

  // GET: /api/Notas
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // GET: /api/Notas/estudiante/1
  getByEstudiante(estudianteId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/estudiante/${estudianteId}`);
  }

  // GET: /api/Notas/profesor/1
  getByProfesor(profesorId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/profesor/${profesorId}`);
  }

  // POST: /api/Notas
  create(dto: NotaCreateDto): Observable<any> {
    return this.http.post<any>(this.apiUrl, dto);
  }

  // PUT: /api/Notas/5
  update(id: number, dto: NotaUpdateDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, dto);
  }

  // DELETE: /api/Notas/5
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
