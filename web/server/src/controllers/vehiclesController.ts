import { Request, Response } from 'express';
import pool from '../database'

class VehiclesController {

    public async vehicles (req: Request, res: Response) {
        const vehicles = await pool.query('select * from vehiculos');
        res.json(vehicles);
    }

    public async getVehicle (req: Request, res: Response) {
        const { id } = req.params;
        const vehiculos= await pool.query('select * from vehiculos where placa= ?',[id]);
        if(vehiculos.length > 0){
            return res.json(vehiculos[0]);
        }
        res.status(404).json({text: 'the vehicle does not exist'});
    }

    public async create (req: Request, res: Response) {
        await pool.query('insert into vehiculos set ?', [req.body]);
        console.log(req.body);
        res.json({text:'Vehiculo guardado'});
        
    }

    public async delete (req:Request, res: Response) {
        const {id} = req.params;
        await pool.query('delete from vehiculos where placa = ?', [id]);
        res.json({text: 'el vehiculo fue eliminado'});
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldVehicle = req.body;
        await pool.query('UPDATE vehiculos set ? WHERE placa = ?', [req.body, id]);
        res.json({ message: "The vehicle was Updated" });
    }

}

const vehiclesController = new VehiclesController();
export default vehiclesController;