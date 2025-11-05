import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (usuarioLogado) {
      return true; 
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
