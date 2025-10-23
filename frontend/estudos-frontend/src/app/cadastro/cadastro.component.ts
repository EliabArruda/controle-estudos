import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule, RouterModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
  usuario = { nome: '', email: '', senha: '' };

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  cadastrar() {
    this.usuarioService.registrarUsuario(this.usuario).subscribe({
      next: () => {
        alert('Usuário cadastrado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (err) => alert('Erro ao cadastrar: ' + err.message)
    });
  }
}
