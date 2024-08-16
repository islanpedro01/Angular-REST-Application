import { Injectable } from '@angular/core';
import {Usuario} from "../model/usuario";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsuarioRestService {

  URL_USUARIOS = 'http://localhost:3000/usuarios';
  constructor(private httpClient: HttpClient) { }

  listar(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.URL_USUARIOS);
  }

  buscarID(id:string): Observable<Usuario> {
    return this.httpClient.get<Usuario>(this.URL_USUARIOS+'/'+id);
  }

  editar(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.put<Usuario>(this.URL_USUARIOS+'/'+usuario.id,usuario);
  }

  inserir(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.URL_USUARIOS, usuario);
  }

  remover(id:string): Observable<Usuario> {
    return this.httpClient.delete<Usuario>(this.URL_USUARIOS+'/'+id);
  }

  private validarMaiorIdade(usuario: Usuario) {
    if (usuario.idade < 18) {
        throw new Error('Usuário nao pode ser menor!');
    }
}

private validarIDExistente(usuario: Usuario) {
    this.buscarID(usuario.id).subscribe(
      {
        next: usuarioBuscado => usuario = usuarioBuscado
      }

    );
    if (usuario) {
        throw new Error('Usuário já cadastrado com ID!');
    }
    return usuario;

}
}
