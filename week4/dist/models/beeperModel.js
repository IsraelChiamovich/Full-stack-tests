"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeeperStatus = exports.Beeper = void 0;
var BeeperStatus;
(function (BeeperStatus) {
    BeeperStatus["Manufactured"] = "manufactured";
    BeeperStatus["Assembled"] = "assembled";
    BeeperStatus["Shipped"] = "shipped";
    BeeperStatus["Deployed"] = "deployed";
    BeeperStatus["Detonated"] = "detonated";
})(BeeperStatus || (exports.BeeperStatus = BeeperStatus = {}));
class Beeper {
    constructor(name) {
        this.name = name;
        this.id = Number(Math.random().toString().split(".")[1]);
        this.status = BeeperStatus.Manufactured;
        this.created_at = new Date();
    }
}
exports.Beeper = Beeper;
//# sourceMappingURL=beeperModel.js.map