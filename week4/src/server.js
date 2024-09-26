"use strict";
// src/server.ts
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authController_js_1 = require("./controllers/authController.js");
var userController_js_1 = require("./controllers/userController.js");
var postController_js_1 = require("./controllers/postController.js");
require("dotenv/config");
var app = (0, express_1.default)();
app.use("/auth", authController_js_1.default);
app.use("/user", userController_js_1.default);
app.use("/post", postController_js_1.default);
app.listen(process.env.PORT, function () {
    console.log("Server is running on port ".concat(process.env.PORT));
});
