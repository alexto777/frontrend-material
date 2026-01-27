import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ProfesoresService } from '../../core/services/profesores.service';
import { CreateProfesorDialogComponent } from './create-profesor-dialog/create-profesor-dialog.component';
import { Profesor } from '../../core/models/profesor.model';

@Component({
  selector: 'app-profesores',
  standalone: true,
  imports: [
    CommonModule,        // 🔴 SIN ESTO ngIf NO FUNCIONA
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.scss']
})
export class ProfesoresComponent implements OnInit {

  displayedColumns = ['nombre', 'acciones'];
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
        }
      });
    });
  }

  editar(profesor: Profesor) {
    const dialogRef = this.dialog.open(CreateProfesorDialogComponent, {
      data: profesor
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.service.update(profesor.id, result).subscribe({
        next: () => {
          this.snackBar.open('Profesor actualizado', 'OK', { duration: 2000 });
          this.load();
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
            'El profesor tiene notas asociadas',
            'Cerrar',
            { duration: 4000 }
          );
        }
      }
    });
  }
}
