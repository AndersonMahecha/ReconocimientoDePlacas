import { Request, Response } from 'express';
import { text } from 'body-parser';

class IndexController {

    public index (req: Request, res: Response) {
        res.json('text: api is /api/vehicles');
        res.json('text: api is /api/usuario');
        res.json('text: api is /api/factura')
    }
}

export const indexController = new IndexController();