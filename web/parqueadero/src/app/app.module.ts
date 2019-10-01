import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from  '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { PerfilComponent } from './perfil/perfil.component';
import { Routes, RouterModule} from '@angular/router';
import { RegistroVehiculoComponent } from './registro-vehiculo/registro-vehiculo.component';
import { verifyLoginPipe } from './pipes/verifyLogin';
import { SearchPipe } from './pipes/search';

const appRoutes: Routes= [
  {path:'', component: HomeComponent},
  {path:'home', component: HomeComponent},
  {path:'administracion', component: AdministracionComponent},
  {path:'perfil', component: PerfilComponent},
  {path:'login', component: LoginComponent},
  {path:'registro-vehiculo', component: RegistroVehiculoComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MenuComponent,
    AdministracionComponent,
    PerfilComponent,
    RegistroVehiculoComponent,
    verifyLoginPipe,
    SearchPipe
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
