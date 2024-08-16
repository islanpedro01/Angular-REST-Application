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
    this.validarMaiorIdade(usuario);
    return this.httpClient.put<Usuario>(this.URL_USUARIOS+'/'+usuario.id,usuario);
  }

  async inserir(usuario: Usuario): Promise<Observable<Usuario>> {
    this.validarMaiorIdade(usuario);
    await this.validarID(usuario);
    return this.httpClient.post<Usuario>(this.URL_USUARIOS, usuario);
  }

  remover(id:string): Observable<Usuario> {
    return this.httpClient.delete<Usuario>(this.URL_USUARIOS+'/'+id);
  }

  private validarMaiorIdade(usuario: Usuario):void{
    if (usuario.idade < 18) {
        throw new Error('Usuário não pode ser menor de idade!');
    }
}

private validarID(usuario: Usuario) {
  
  return new Promise<void>((resolve, reject) => {
    this.buscarID(usuario.id).subscribe({
      next: usuarioBuscado => {
        if (usuarioBuscado) {
          reject(new Error('Já existe outro usuário com este ID!'));
        } else {
          resolve();
        }
      },
    });
  });
}
}
