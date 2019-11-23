import { Component, OnInit, HostBinding } from '@angular/core';
import { vehicles } from '../interfaces/vehicles';
import { reco } from '../interfaces/reco';
import { RecoService } from '../services/reco.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register-vehicle',
  templateUrl: './register-vehicle.component.html',
  styleUrls: ['./register-vehicle.component.css']
})
export class RegisterVehicleComponent implements OnInit {

  vehicle: reco = {
    id: 0,
    placa: '',
    image: 'default',
    ingreso: new Date(),
    tipoVehiculo: '',
    idOwner: ''
  }

  constructor(private recService: RecoService, private router: Router, private activatedRoute: ActivatedRoute){}
  
  ngOnInit() {
  }

  register() {
    delete this.vehicle.ingreso;
    delete this.vehicle.id;
    this.recService.saveVehicle(this.vehicle).subscribe(
        res => {
          console.log(res);
         this.router.navigate(['/vehicles']);
        },
        err => console.error(err)
      )
  }

  update(id: string) {
    delete this.vehicle.id;
    delete this.vehicle.ingreso;
    this.recService.updateVehicle(id,this.vehicle).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/vehicles']);
      },
      err => console.error(err)
    )
  }

}
