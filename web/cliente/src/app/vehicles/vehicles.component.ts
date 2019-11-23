import { Component, OnInit } from '@angular/core';
import { RecoService } from '../services/reco.service'; 
import { vehicles } from '../interfaces/vehicles';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
 
  vehicles: any = [];
  query: string = "";
  constructor(private recoService: RecoService) { }

  ngOnInit(){
    this.getVehicles();
  }

  getVehicles() {
    this.recoService.getVehiculos().subscribe(
      res => {
        this.vehicles =res;
      },
      err => console.log(err)
    );
  }

  delete(id: string) {
    this.recoService.deleteVehicle(id).subscribe(
      res => {
        console.log(res);
        this.getVehicles();
      },
        err => console.log(err)
    )
  }

}
