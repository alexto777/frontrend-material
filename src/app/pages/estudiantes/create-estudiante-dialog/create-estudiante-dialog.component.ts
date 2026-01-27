import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  standalone: true,
  selector: 'app-create-estudiante-dialog',
  templateUrl: './create-estudiante-dialog.component.html',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class CreateEstudianteDialogComponent {
  form = this.fb.group({
    nombre: ['', Validators.required],
    email: ['']
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateEstudianteDialogComponent>
  ) {}

  guardar() {
    if (this.form.invalid) return;

    this.dialogRef.close({
      nombre: this.form.value.nombre
    });
  }


  cancelar() {
    this.dialogRef.close();
  }
}
