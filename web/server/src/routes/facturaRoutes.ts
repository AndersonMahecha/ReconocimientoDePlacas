import { Router } from 'express';
import facturasController from '../controllers/facturaController';

class FacturasRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config() : void {
        this.router.get('/', facturasController.facturas);
        this.router.get('/:id', facturasController.getFactura);
        this.router.post('/', facturasController.create);
        this.router.delete('/:id', facturasController.delete);
        this.router.put('/:id', facturasController.update);
    }


}

const facturasRoutes = new FacturasRoutes();
export default facturasRoutes.router;