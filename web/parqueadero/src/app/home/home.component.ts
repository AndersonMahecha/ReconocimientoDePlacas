import { Component, OnInit } from '@angular/core';
import { usuario } from '../interfaces/usuario';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  usuarios:usuario[];
  query:string="";

  constructor(private usuarioService: UsuarioService) { 
    this.usuarios=usuarioService.getUsuarios();
  }

  ngOnInit() {
  }

}
