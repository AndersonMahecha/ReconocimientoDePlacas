import { Component, OnInit } from '@angular/core';
import {usuario} from '../interfaces/usuario';
import { verifyLoginPipe } from '../pipes/verifyLogin';
import { UsuarioService } from '../services/usuario.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  operation:string='login';
  usuarios:usuario[];
  query:string="";
 
  constructor(private usuarioService:UsuarioService) { 
    this.usuarios=usuarioService.getUsuarios();   
  }

  ngOnInit() {
  }

}
