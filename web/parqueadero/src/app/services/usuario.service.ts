import { Injectable } from '@angular/core';
import{usuario} from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarios:usuario[];
  constructor() { 
    let usuario1: usuario={
      idUsuario:"1001",
      nombre:"sergio",
      telefono:"3005735883",
      direccion:"cll 5a",
      sexo:"masculino",
      cargo:"jefe",
      password:"1234"
    }
    let usuario2: usuario={
      idUsuario:"987",
      nombre:"camila",
      telefono:"7541523",
      direccion:"cll 87a",
      sexo:"femenino",
      cargo:"usuario",
      password:"123456789"
    }
    this.usuarios=[usuario1,usuario2];
  }

  getUsuarios(){
    return this.usuarios;
  }
}
