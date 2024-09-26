"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const beeperService_1 = __importDefault(require("../services/beeperService"));
class BeeperController {
    static createBeeper(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newBeeper = req.body;
                const createdBeeper = yield beeperService_1.default.createBeeper(newBeeper.name);
                return res.status(201).json(createdBeeper);
            }
            catch (err) {
                return res.status(500).json({ message: err.message });
            }
        });
    }
    static getAllBeepers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const beepers = yield beeperService_1.default.getAllBeepers();
                return res.status(200).json(beepers);
            }
            catch (err) {
                return res.status(500).json({ message: err.message });
            }
        });
    }
    static getBeeperById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id, 10);
                const beeper = yield beeperService_1.default.getBeeperById(id);
                if (beeper) {
                    return res.status(200).json(beeper);
                }
                return res.status(404).json({ message: 'Beeper not found' });
            }
            catch (err) {
                return res.status(500).json({ message: err.message });
            }
        });
    }
    static updateBeeperStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const { status, lat, lon } = req.body;
                const updatedBeeper = yield beeperService_1.default.updateBeeperStatus(id, status, lat, lon);
                if (updatedBeeper) {
                    return res.status(200).json(updatedBeeper);
                }
                return res.status(404).json({ message: 'Beeper not found' });
            }
            catch (err) {
                return res.status(500).json({ message: err.message });
            }
        });
    }
    static deleteBeeper(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id, 10);
                const success = yield beeperService_1.default.deleteBeeper(id);
                if (success) {
                    return res.status(200).json({ message: 'Beeper deleted successfully' });
                }
                return res.status(404).json({ message: 'Beeper not found' });
            }
            catch (err) {
                return res.status(500).json({ message: err.message });
            }
        });
    }
    static getBeepersByStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const status = req.params.status;
                const beepers = yield beeperService_1.default.getBeepersByStatus(status);
                return res.status(200).json(beepers);
            }
            catch (err) {
                return res.status(500).json({ message: err.message });
            }
        });
    }
}
exports.default = BeeperController;
//# sourceMappingURL=beeperController.js.map