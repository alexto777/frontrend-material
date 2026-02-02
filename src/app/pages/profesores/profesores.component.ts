import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { ProfesoresService } from '../../core/services/profesores.service';
import { CreateProfesorDialogComponent } from './create-profesor-dialog/create-profesor-dialog.component';
import { Profesor } from '../../core/models/profesor.model';

@Component({
  selector: 'app-profesores',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.scss']
})
export class ProfesoresComponent implements OnInit {

  displayedColumns = ['nombre','acciones'];
  dataSource: Profesor[] = [];

  constructor(
    private service: ProfesoresService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getAll().subscribe({
      next: data => this.dataSource = data,
      error: () =>
        this.snackBar.open('Error cargando profesores', 'Cerrar', { duration: 3000 })
    });
  }

  crear() {
    const dialogRef = this.dialog.open(CreateProfesorDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.service.create(result).subscribe({
        next: () => {
          this.snackBar.open('Profesor creado', 'OK', { duration: 2000 });
          this.load();
        },
        error: err => {
          console.error('ERROR CREATE 👉', err);
          this.snackBar.open('Error creando profesor', 'Cerrar', { duration: 3000 });
        }
      });
    });
  }

  editar(profesor: Profesor) {
    const dialogRef = this.dialog.open(CreateProfesorDialogComponent, {
      data: {
        id: profesor.id,
        nombre: profesor.nombre,
        materiaId: (profesor as any).materiaId ?? null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.service.update(result.id, result).subscribe({
        next: () => {
          this.snackBar.open('Profesor actualizado', 'OK', { duration: 2000 });
          this.load();
        },
        error: err => {
          console.error('ERROR PUT 👉', err);
          this.snackBar.open('Error actualizando profesor', 'Cerrar', { duration: 3000 });
        }
      });

    });
  }

  eliminar(profesor: Profesor) {
    this.service.delete(profesor.id).subscribe({
      next: () => {
        this.snackBar.open('Profesor eliminado', 'OK', { duration: 2000 });
        this.load();
      },
      error: err => {
        if (err.status === 400) {
          this.snackBar.open(
            'El profesor tiene estudiantes asignados con notas',
            'Cerrar',
            { duration: 4000 }
          );
        } else {
          this.snackBar.open('Error eliminando profesor', 'Cerrar', { duration: 3000 });
        }
      }
    });
  }
}
