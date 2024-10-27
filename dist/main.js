"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./config/app");
app_1.app.listen({
    port: 3333,
    host: "0.0.0.0",
}).then(() => {
    console.log("HTTP Server running!");
});
//# sourceMappingURL=main.js.map