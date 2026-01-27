import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { EstudiantesService } from '../../core/services/estudiantes.service';
import { Estudiante } from '../../core/models/estudiante.model';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CreateEstudianteDialogComponent } from './create-estudiante-dialog/create-estudiante-dialog.component';


@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatPaginatorModule,
    FormsModule
  ],
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.scss']
})
export class EstudiantesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns = ['nombre', 'notas', 'acciones'];
  dataSource = new MatTableDataSource<Estudiante>();


  constructor(
    private service: EstudiantesService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.service.getAll().subscribe({
      next: data => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      },

      error: () =>
        this.snackBar.open('Error cargando estudiantes', 'Cerrar', {
          duration: 3000
        })
    });
  }

  eliminar(estudiante: Estudiante) {
    this.service.delete(estudiante.id).subscribe({
      next: () => {
        this.snackBar.open('Estudiante eliminado', 'OK', {
          duration: 2000
        });
        this.load();
      },
      error: (err) => {
        if (err.status === 400) {
          this.snackBar.open(
            'No se puede eliminar el estudiante porque tiene notas asociadas',
            'Cerrar',
            { duration: 4000 }
          );
        } else {
          this.snackBar.open(
            'Error eliminando estudiante',
            'Cerrar',
            { duration: 3000 }
          );
        }
      }
    });
  }

  crear() {
    const dialogRef = this.dialog.open(CreateEstudianteDialogComponent, {
      width: '420px',
      panelClass: 'custom-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.service.create(result).subscribe({
        next: () => {
          this.snackBar.open('Estudiante creado', 'OK', { duration: 2000 });
          this.load();
        },
        error: () => {
          this.snackBar.open(
            'Error creando estudiante',
            'Cerrar',
            { duration: 3000 }
          );
        }
      });
    });
  }

  activarEdicion(estudiante: Estudiante) {
  estudiante.editando = true;
  estudiante.nombreEditado = estudiante.nombre;
}

cancelarEdicion(estudiante: Estudiante) {
  estudiante.editando = false;
  estudiante.nombreEditado = estudiante.nombre;
}

guardarEdicion(estudiante: Estudiante) {
  if (!estudiante.nombreEditado?.trim()) return;

  this.service.update(estudiante.id, {
    nombre: estudiante.nombreEditado
  }).subscribe({
    next: () => {
      estudiante.nombre = estudiante.nombreEditado!;
      estudiante.editando = false;
      this.snackBar.open('Estudiante actualizado', 'OK', {
        duration: 2000
      });
    },
    error: () => {
      this.snackBar.open('Error actualizando estudiante', 'Cerrar', {
        duration: 3000
      });
    }
  });
}

}
