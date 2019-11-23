import { Request, Response } from 'express';
import pool from '../database'

class FacturaController {

    public async facturas (req: Request, res: Response) {
        const usuarios = await pool.query('select * from factura');
        res.json(usuarios);
    }

    public async getFactura (req: Request, res: Response) {
        const { id } = req.params;
        const usuarios= await pool.query('select * from factura where placaVehiculo= ?',[id]);
        if(usuarios.length > 0){
            return res.json(usuarios[0]);
        }
        res.status(404).json({text: 'the user does not exist'});
    }

    public async create (req: Request, res: Response) {
        await pool.query('insert into factura set ?', [req.body]);
        console.log(req.body);
        res.json({text:'Usuario guardado'});
        
    }

    public async delete (req:Request, res: Response) {
        const {idUser} = req.params;
        await pool.query('delete from factura where placaVehiculo = ?', [idUser]);
        res.json({text: 'el usuario fue eliminado'});
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { idUser } = req.params;
        const oldUser = req.body;
        await pool.query('UPDATE usuario set ? WHERE idUser = ?', [req.body, idUser]);
        res.json({ message: "The user was Updated" });
    }

}

const facturaController = new FacturaController();
export default facturaController;