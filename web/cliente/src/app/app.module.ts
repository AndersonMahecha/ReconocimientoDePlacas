import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {HttpClientModule} from '@angular/common/http';

import {SearchPipe} from './pipes/search';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterVehicleComponent } from './register-vehicle/register-vehicle.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { CommonModule } from '@angular/common';
import { FacturaComponent } from './factura/factura.component';


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'registerVehicle', component:RegisterVehicleComponent},
  {path: 'vehicles',component:VehiclesComponent},
  {path: 'factura', component:FacturaComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    RegisterVehicleComponent,
    VehiclesComponent,
    SearchPipe,
    FacturaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireDatabaseModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
