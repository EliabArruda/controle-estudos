import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';

@Component({
  selector: 'app-sessao',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './sessao.component.html',
  styleUrl: './sessao.component.scss'
})
export class SessaoComponent {

}
