import { Request, Response } from 'express';
import BeeperService from '../services/beeperService';
import { Beeper, BeeperStatus } from '../models/beeperModel';

class BeeperController {
    public static async createBeeper(req: Request, res: Response): Promise<Response> {
        try {
            const newBeeper: Beeper = req.body;
            const createdBeeper: Beeper = await BeeperService.createBeeper(newBeeper.name);
            return res.status(201).json(createdBeeper);
        } catch (err: any) {
            return res.status(500).json({ message: err.message });
        }
    }

    public static async getAllBeepers(req: Request, res: Response): Promise<Response> {
        try {
            const beepers: Beeper[] = await BeeperService.getAllBeepers();
            return res.status(200).json(beepers);
        } catch (err: any) {
            return res.status(500).json({ message: err.message });
        }
    }

    public static async getBeeperById(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id, 10);
            const beeper = await BeeperService.getBeeperById(id);
            if (beeper) {
                return res.status(200).json(beeper);
            }
            return res.status(404).json({ message: 'Beeper not found' });
        } catch (err: any) {
            return res.status(500).json({ message: err.message });
        }
    }

    public static async updateBeeperStatus(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            const { status, lat, lon } = req.body;
            const updatedBeeper = await BeeperService.updateBeeperStatus(id, status as BeeperStatus, lat, lon);

            if (updatedBeeper) {
                return res.status(200).json(updatedBeeper);
            }
            return res.status(404).json({ message: 'Beeper not found' });
        } catch (err: any) {
            return res.status(500).json({ message: err.message });
        }
    }

    public static async deleteBeeper(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id, 10);
            const success = await BeeperService.deleteBeeper(id);
            if (success) {
                return res.status(200).json({ message: 'Beeper deleted successfully' });
            }
            return res.status(404).json({ message: 'Beeper not found' });
        } catch (err: any) {
            return res.status(500).json({ message: err.message });
        }
    }

    public static async getBeepersByStatus(req: Request, res: Response): Promise<Response> {
        try {
            const status = req.params.status as BeeperStatus;
            const beepers = await BeeperService.getBeepersByStatus(status);
            return res.status(200).json(beepers);
        } catch (err: any) {
            return res.status(500).json({ message: err.message });
        }
    }
}

export default BeeperController;
