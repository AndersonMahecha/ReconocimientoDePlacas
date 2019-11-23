import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { factura } from '../interfaces/factura'; 


@Injectable({
  providedIn: 'root'
})
export class FacturaService {

    API_URI= 'http://localhost:3000/api';
  constructor(private http: HttpClient) { 
  }

  getFacturas(){
    return this.http.get(`${this.API_URI}/facturas`);
  }

  getFactura(id: string){
    return this.http.get(`${this.API_URI}/facturas/${id}`);
  }

  deleteFactura(id: string) {
    return this.http.delete(`${this.API_URI}/facturas/${id}`);
  }

  saveFactura(factura: factura) {
    return this.http.post(`${this.API_URI}/facturas`,factura);
  }   
  
  updateFactura(placa: string, updatedFactura: factura) {
    return this.http.put(`${this.API_URI}/facturas/${placa}`, updatedFactura);
  }

}
