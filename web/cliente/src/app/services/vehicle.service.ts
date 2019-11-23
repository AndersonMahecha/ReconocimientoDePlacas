import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private angularFireDatabase: AngularFireDatabase) { 
  }

  getVehicles(){
    return this.angularFireDatabase.list('/vehicles');
  }
  getVehicleByPlaca(uid){
    return this.angularFireDatabase.object('/vehicles/'+uid);
  }
  createVehicle(vehicle){
    return this.angularFireDatabase.object('/vehicles/'+vehicle.uid).set(vehicle);
  }
  editVehicle(vehicle){
    return this.angularFireDatabase.object('/vehicles/'+vehicle.uid).set(vehicle);
  }
}
