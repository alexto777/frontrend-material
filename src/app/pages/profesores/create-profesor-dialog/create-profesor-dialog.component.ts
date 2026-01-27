import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-profesor-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './create-profesor-dialog.component.html',
  styleUrls: ['./create-profesor-dialog.component.scss']
})
export class CreateProfesorDialogComponent {

  form = this.fb.group({
    nombre: ['', Validators.required]
  });

  constructor(
  private fb: FormBuilder,
  private dialogRef: MatDialogRef<CreateProfesorDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data?: any
) {
  this.form = this.fb.group({
    nombre: [data?.nombre || '', Validators.required]
  });
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
