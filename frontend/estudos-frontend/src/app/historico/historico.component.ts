import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';


@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.scss'
})
export class HistoricoComponent {

}
