import {Pipe, PipeTransform} from '@angular/core';
import { usuario } from '../interfaces/usuario';

@Pipe({
    name: 'verifyLogin'
})

export class verifyLoginPipe implements PipeTransform{
  user:usuario;

  /**
   * 
   * @param value: llega el objeto usuario con la info de este 
   * @param pass : contraseña ingresada en el login
   */
    public transform(value, pass: string){
      this.user=value;
      if(!value){return false;}
      if(!pass){return false;}
      
      if(this.user.password==pass){
        return true;
      }else{return false;}
      
    }
  }