import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  exports: [
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule
  ]
})
export class MaterialModule {}
