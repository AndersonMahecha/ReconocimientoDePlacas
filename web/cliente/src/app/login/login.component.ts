import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = null;
  password: string = null;
 
  constructor(private authenticationService: AuthenticationService, private userService: UserService,
    private router: Router) { }

  ngOnInit() {
  }

  login(){
    this.authenticationService.loginWithEmail(this.email, this.password).then( (data) => {
      alert ('Loggeado correctamente');
      console.log(data);
      this.router.navigate(['home']);
    }).catch( (error) =>{
      alert('ocurrio un error');
      console.log(error);
    });
  }


}
