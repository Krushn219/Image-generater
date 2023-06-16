"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// Load env variables
require("dotenv").config();
const app_1 = tslib_1.__importDefault(require("./app"));
// Bootstrap application
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const port = parseInt(process.env.PORT || "5000");
        const server = app_1.default.listen(port, () => console.log(`################################################
  🛡️  Server listening on port: ${port} 🛡️
################################################`));
        server.timeout = 600000;
    });
}
bootstrap();
//# sourceMappingURL=index.js.map