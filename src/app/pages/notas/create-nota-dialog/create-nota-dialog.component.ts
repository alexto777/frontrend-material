import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { EstudiantesService } from '../../../core/services/estudiantes.service';
import { ProfesoresService } from '../../../core/services/profesores.service';

@Component({
  selector: 'app-create-nota-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './create-nota-dialog.component.html'
})
export class CreateNotaDialogComponent implements OnInit {

  estudiantes: any[] = [];
  profesores: any[] = [];

  form = this.fb.group({
    estudianteId: [null, Validators.required],
    profesorId: [null, Validators.required],
    materia: ['', Validators.required],
    valor: [null, [Validators.required, Validators.min(0), Validators.max(5)]]
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateNotaDialogComponent>,
    private estudiantesService: EstudiantesService,
    private profesoresService: ProfesoresService
  ) {}

  ngOnInit() {
    this.estudiantesService.getAll().subscribe(r => this.estudiantes = r);
    this.profesoresService.getAll().subscribe(r => this.profesores = r);
  }

  guardar() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
