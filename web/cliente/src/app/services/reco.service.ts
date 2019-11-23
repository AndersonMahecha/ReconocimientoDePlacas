import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { reco } from '../interfaces/reco'; 


@Injectable({
  providedIn: 'root'
})
export class RecoService {

    API_URI= 'http://localhost:3000/api';
  constructor(private http: HttpClient) { 
  }

  getVehiculos(){
    return this.http.get(`${this.API_URI}/vehicles`);
  }

  getVehicle(id: string){
    return this.http.get(`${this.API_URI}/vehicles/${id}`);
  }

  deleteVehicle(id: string) {
    return this.http.delete(`${this.API_URI}/vehicles/${id}`);
  }

  saveVehicle(vehicle: reco) {
    return this.http.post(`${this.API_URI}/vehicles`,vehicle);
  }   
  
  updateVehicle(placa: string, updatedVehicle: reco) {
    return this.http.put(`${this.API_URI}/vehicles/${placa}`, updatedVehicle);
  }
}
