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
Object.defineProperty(exports, "__esModule", { value: true });
const fileDataLayer_1 = require("../config/fileDataLayer");
const beeperModel_1 = require("../models/beeperModel");
class BeeperService {
    static getAllBeepers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, fileDataLayer_1.getFileData)("beepers");
            }
            catch (err) {
                throw new Error("Failed to get beepers");
            }
        });
    }
    static getBeeperById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const beepers = yield this.getAllBeepers();
                return beepers.find((beeper) => beeper.id === id);
            }
            catch (err) {
                throw new Error(`beeper with id ${id} not found`);
            }
        });
    }
    static createBeeper(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newBeeper = new beeperModel_1.Beeper(name);
                const beepers = yield this.getAllBeepers();
                beepers.push(newBeeper);
                yield (0, fileDataLayer_1.saveFileData)('beepers', beepers);
                return newBeeper;
            }
            catch (err) {
                throw new Error("Error creating new beeper");
            }
        });
    }
    static updateBeeperStatus(id, status, latitude, longitude) {
        return __awaiter(this, void 0, void 0, function* () {
            const beepers = yield this.getAllBeepers();
            const beeper = beepers.find((beeper) => beeper.id === id);
            if (!beeper || !this.isValidStatusUpdate(beeper.status, status)) {
                throw new Error(`Invalid beeper or status update for id ${id}`);
            }
            beeper.status = status;
            if (status === beeperModel_1.BeeperStatus.Deployed) {
                if (!(latitude && longitude)) {
                    throw new Error('please enter latitude and longitude');
                }
                beeper.latitude = latitude;
                beeper.longitude = longitude;
                this.timerBeeperDetonation(beeper);
            }
            else if (status === beeperModel_1.BeeperStatus.Detonated) {
                beeper.detonated_at = new Date();
            }
            yield (0, fileDataLayer_1.saveFileData)('beepers', beepers);
            return beeper;
        });
    }
    static isValidPositionToUpdate(long, lat) {
        return (35.04438 <= long && long <= 36.59793 && 33.01048 <= lat && lat <= 34.6793);
    }
    static isValidStatusUpdate(currentStatus, newStatus) {
        const statusOrder = [
            beeperModel_1.BeeperStatus.Manufactured,
            beeperModel_1.BeeperStatus.Assembled,
            beeperModel_1.BeeperStatus.Shipped,
            beeperModel_1.BeeperStatus.Deployed,
            beeperModel_1.BeeperStatus.Detonated,
        ];
        const currentStatusIndex = statusOrder.indexOf(currentStatus);
        const newStatusIndex = statusOrder.indexOf(newStatus);
        return newStatusIndex > currentStatusIndex;
    }
    static timerBeeperDetonation(beeper) {
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            const beepers = yield this.getAllBeepers();
            const updatedBeeper = beepers.find((b) => b.id === beeper.id);
            if (updatedBeeper) {
                updatedBeeper.status = beeperModel_1.BeeperStatus.Detonated;
                updatedBeeper.detonated_at = new Date();
                yield (0, fileDataLayer_1.saveFileData)('beepers', beepers);
                console.log(`Beeper ${beeper.id} has been detonated`);
            }
        }), 10000);
    }
    static deleteBeeper(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const beepers = yield this.getAllBeepers();
                const updatedBeepers = beepers.filter((beeper) => beeper.id !== id);
                if (updatedBeepers.length !== beepers.length) {
                    yield (0, fileDataLayer_1.saveFileData)('beepers', updatedBeepers);
                    return true;
                }
                return false;
            }
            catch (err) {
                throw new Error(`Failed to delete beeper with id ${id}`);
            }
        });
    }
    static getBeepersByStatus(status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const beepers = yield this.getAllBeepers();
                return beepers.filter((beeper) => beeper.status === status);
            }
            catch (err) {
                throw new Error(`Failed to get beepers with status ${status}`);
            }
        });
    }
}
exports.default = BeeperService;
//# sourceMappingURL=beeperService.js.map