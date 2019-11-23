import express, {application} from 'express';
import { Application } from 'express-serve-static-core';
import morgan from 'morgan';
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';
import vehiclesRoutes from './routes/vehiclesRoutes';
import usersRoutes from './routes/usersRoutes';
import facturaRoutes from './routes/facturaRoutes';

class Server {

    public app: Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port',process.env.port || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    routes(): void {
        this.app.use('/',indexRoutes);
        this.app.use('/api/vehicles/',vehiclesRoutes);
        this.app.use('/api/usuario/', usersRoutes);
        this.app.use('/api/factura/', facturaRoutes);
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('server on port ', this.app.get('port'));
        }) 
    }
}

const server = new Server();
server.start();