import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../services/factura.service'; 
import { vehicles } from '../interfaces/vehicles';
import { factura } from '../interfaces/factura';
import { Router, ActivatedRoute } from '@angular/router';
import { RecoService } from '../services/reco.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {
 
  factura: factura ={
    id: 0,
    idUser: 0,
    placaVehiculo: '',
    salida: new Date(),
    precio: 0   
}
  
  vehicles: any = [];
  precioM: string = '';
  precioMnum: number=1;
  tipoVehi: string = 'moto';
  minutos: number=40;
  placa: string='';
  constructor(private facturaService: FacturaService,private recoService: RecoService ,private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(){
    this.getVehicles();
    this.cobro(this.tipoVehi);
  }


  
  cobro(tipo: string) {
    switch (tipo) {
      case 'moto':
        this.precioM='$65/min';
        this.precioMnum = 65;
        this.factura.precio=this.precioMnum*this.minutos;
        break;
      case 'carro':
        this.precioM='$85/min';
        this.precioMnum = 85;
        this.factura.precio=this.precioMnum*this.minutos;
        break;
      case 'bicicleta':
        this.precioM='$15/min';
        this.precioMnum = 15;
        this.factura.precio=this.precioMnum*this.minutos;
        break;  
      default:
          this.precioM='$40/min';
          this.precioMnum = 40;
          this.factura.precio=this.precioMnum*this.minutos;
        break;
    }
  }

  
 
  getVehicles() {
    this.recoService.getVehiculos().subscribe(
      res => {
        this.vehicles =res;
      },
      err => console.log(err)
    );
  }

  
  register() {
    delete this.factura.id;
    this.facturaService.saveFactura(this.factura).subscribe(
        res => {
          console.log(res);
         this.router.navigate(['/factura']);
        },
        err => console.error(err)
      )
  }

  
}
