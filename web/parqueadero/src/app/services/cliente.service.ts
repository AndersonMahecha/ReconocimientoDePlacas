import { Injectable } from '@angular/core';
import {cliente} from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  clientes: cliente[];
  busqueda:cliente[];
  constructor() { }

  addClientes(cliente:cliente){
    if(!cliente.idCliente==null && !cliente.nombre==null && !cliente.telefono==null){
      this.clientes.push(cliente);
      return 1;
    }else{return 0}
  }

  getClientes(){
    return this.clientes;
  }

}
