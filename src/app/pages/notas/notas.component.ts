import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { NotasService, NotaCreateDto, NotaUpdateDto } from '../../core/services/notas.service';
import { EstudiantesService } from '../../core/services/estudiantes.service';
import { ProfesoresService } from '../../core/services/profesores.service';
import { CreateNotaDialogComponent } from './create-nota-dialog/create-nota-dialog.component';



@Component({
  selector: 'app-notas',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss']
})

export class NotasComponent implements OnInit {

  displayedColumns = ['estudiante', 'profesor', 'materia', 'valor', 'acciones'];
  dataSource = new MatTableDataSource<any>([]);

  estudiantes: any[] = [];
  profesores: any[] = [];

  constructor(
    private notasService: NotasService,
    private estudiantesService: EstudiantesService,
    private profesoresService: ProfesoresService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.load();
    this.loadCombos();
  }

  load() {
    this.notasService.getAll().subscribe({
      next: data => this.dataSource.data = data,
      error: () => this.snackBar.open('Error cargando notas', 'Cerrar', { duration: 3000 })
    });
  }

  loadCombos() {
    this.estudiantesService.getAll().subscribe(e => this.estudiantes = e);
    this.profesoresService.getAll().subscribe(p => this.profesores = p);
  }

  crear() {
    const dialogRef = this.dialog.open(CreateNotaDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.notasService.create(result).subscribe({
        next: () => {
          this.snackBar.open('Nota creada', 'OK', { duration: 2000 });
          this.load();
        },
        error: () => {
          this.snackBar.open('Error creando nota', 'Cerrar', { duration: 3000 });
        }
      });
    });
  }


  editar(id: number, dto: NotaUpdateDto) {
    this.notasService.update(id, dto).subscribe({
      next: () => {
        this.snackBar.open('Nota actualizada', 'OK', { duration: 2000 });
        this.load();
      },
      error: e => this.snackBar.open(e.error ?? 'Error actualizando nota', 'Cerrar', { duration: 3000 })
    });
  }

  eliminar(id: number) {
    if (!confirm('¿Eliminar nota?')) return;

    this.notasService.delete(id).subscribe({
      next: () => {
        this.snackBar.open('Nota eliminada', 'OK', { duration: 2000 });
        this.load();
      },
      error: e => this.snackBar.open(e.error ?? 'Error eliminando nota', 'Cerrar', { duration: 3000 })
    });
  }
}
