import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id?: number;
  nome: string;
  email: string;
  senha: string;
}

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) { }

  listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  registrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  buscarPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  login(email: string, senha: string): Observable<Usuario | undefined> {
    return this.http.get<Usuario[]>(`${this.apiUrl}?email=${encodeURIComponent(email)}&senha=${encodeURIComponent(senha)}`)
      .pipe(

    ) as unknown as Observable<Usuario | undefined>;

  }
}
