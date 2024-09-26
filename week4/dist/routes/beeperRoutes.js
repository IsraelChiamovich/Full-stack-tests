"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const beeperController_1 = __importDefault(require("../controllers/beeperController"));
const router = (0, express_1.Router)();
router.post('/', beeperController_1.default.createBeeper);
router.get('/', beeperController_1.default.getAllBeepers);
router.get('/:id', beeperController_1.default.getBeeperById);
router.put('/:id/status', beeperController_1.default.updateBeeperStatus);
router.delete('/:id', beeperController_1.default.deleteBeeper);
router.get('/status/:status', beeperController_1.default.getBeepersByStatus);
exports.default = router;
//# sourceMappingURL=beeperRoutes.js.map