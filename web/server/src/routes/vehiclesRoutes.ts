import { Router } from 'express';
import vehiclesController from '../controllers/vehiclesController'

class VehiclesRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config() : void {
        this.router.get('/', vehiclesController.vehicles);
        this.router.get('/:id', vehiclesController.getVehicle);
        this.router.post('/', vehiclesController.create);
        this.router.delete('/:id', vehiclesController.delete);
        this.router.put('/:id', vehiclesController.update);
    }


}

const vehiclesRoutes = new VehiclesRoutes();
export default vehiclesRoutes.router;