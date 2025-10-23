import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root', // garante que o serviço está disponível globalmente
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (usuarioLogado) {
      return true; // pode acessar a rota
    } else {
      this.router.navigate(['/login']); // redireciona para login
      return false;
    }
  }
}
