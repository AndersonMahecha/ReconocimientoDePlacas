import { Router } from 'express';
import usersController from '../controllers/usersController'

class UsersRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config() : void {
        this.router.get('/', usersController.users);
        this.router.get('/:id', usersController.getUser);
        this.router.post('/', usersController.create);
        this.router.delete('/:id', usersController.delete);
        this.router.put('/:id', usersController.update);
    }


}

const usersRoutes = new UsersRoutes();
export default usersRoutes.router;