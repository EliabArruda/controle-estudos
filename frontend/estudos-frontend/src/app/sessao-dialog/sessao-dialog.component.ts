import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-sessao-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './sessao-dialog.component.html',
  styleUrls: ['./sessao-dialog.component.scss']
})
export class SessaoDialogComponent {
  sessaoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SessaoDialogComponent>
  ) {
    this.sessaoForm = this.fb.group({
      disciplina: ['', Validators.required],
      assunto: ['', Validators.required],
      duracao: [25, [Validators.required, Validators.min(5), Validators.max(120)]]
    });
  }

  iniciarSessao() {
    if (this.sessaoForm.valid) {
      this.dialogRef.close(this.sessaoForm.value);
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
