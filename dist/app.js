"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
var bodyParser = require("body-parser");
const express_1 = tslib_1.__importDefault(require("express"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const routes_1 = tslib_1.__importDefault(require("./routes"));
const express_validation_1 = require("express-validation");
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.use((0, cors_1.default)());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express_1.default.json({ limit: "50mb", type: "application/json" }));
app.use(express_1.default.static("public/"));
app.use(routes_1.default);
app.use(function (err, req, res, next) {
    if (err instanceof express_validation_1.ValidationError) {
        return res.status(err.statusCode).json(err);
    }
    return res.status(500).json(err);
});
exports.default = app;
//# sourceMappingURL=app.js.map