import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (usuarioLogado) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
}
