import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string = null;
  password: string = null;
  idUser: string = null;
  telefono: string = null;
  nombre: string = null;
  tipoUser: string = null;
  constructor(private authenticationService: AuthenticationService, private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }
  
  register(){
    this.authenticationService.registerWithEmail(this.email, this.password).then( (data) => {
      const user= {
        uid: data.user.uid,
        email: this.email,
        idUser: this.idUser,
        nombre: this.nombre,
        telefono: this.telefono,
        tipoUser: this.tipoUser,
      };
      this.userService.createUser(user).then((data2) =>{
        alert ('registrado correctamente');
        this.router.navigate(['/login']);
       console.log(data2);
      }).catch((error) => {
        alert('el correo ya existe o el id');
      console.log(error);
      })
    }).catch( (error) =>{
      alert('el correo ya existe o el id');
      console.log(error);
    });
  }

  
}
