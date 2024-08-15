import { Component } from '@angular/core';
import {USUARIOS} from "../../shared/model/USUARIOS";
import {Usuario} from "../../shared/model/usuario";
import {Router} from "@angular/router";
import {UsuarioService} from "../../shared/services/usuario.service";
import {UsuarioRestService} from "../../shared/services/usuario-rest.service";
import { MensagemSweetService } from 'src/app/shared/services/mensagem-sweet.service';

@Component({
  selector: 'app-listagem-usuario',
  templateUrl: './listagem-usuario.component.html',
  styleUrl: './listagem-usuario.component.scss'
})
export class ListagemUsuarioComponent {

  usuarios: Usuario[] = [];
  constructor(private roteador: Router, private usuarioRestService: UsuarioRestService, private mensagemService: MensagemSweetService) {
    usuarioRestService.listar().subscribe(
        {
          next: usuariosRetornados => this.usuarios = usuariosRetornados
        }
    );
  }

  remover(usuarioARemover: Usuario) {
    this.usuarioRestService.remover(usuarioARemover.id).subscribe(
      {
        next: usuario => this.roteador.navigate(['listagem-usuarios'])
      }
    );
    this.mensagemService.sucesso('Usuário removido com sucesso!')
  }

  editar(usuarioAEditar: Usuario) {
    this.roteador.navigate(['edicao-usuario', usuarioAEditar.id]);
  }
}
