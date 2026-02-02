import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profesor } from '../models/profesor.model';

@Injectable({ providedIn: 'root' })
export class ProfesoresService {

  private apiUrl = 'http://localhost:56548/api/Profesores';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Profesor[]>(this.apiUrl);
  }

  create(data: Partial<Profesor>) {
    return this.http.post(this.apiUrl, data);
  }

  update(id: number, data: Partial<Profesor>) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

