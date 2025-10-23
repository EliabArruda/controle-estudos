import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule, RouterModule], // 🔹 Adicionado RouterModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  senha = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  login() {
    this.usuarioService.listarUsuarios().subscribe({
      next: (usuarios) => {
        const usuario = usuarios.find(
          (u: any) => u.email === this.email && u.senha === this.senha
        );

        if (usuario) {
          localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
          this.router.navigate(['/dashboard']);
        } else {
          alert('Usuário ou senha incorretos.');
        }
      },
      error: (err) => alert('Erro ao buscar usuários: ' + err.message)
    });
  }
}
