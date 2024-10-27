import { connection } from "config/connection";
import { app } from "./config/app";

app.listen({
    port: 8080,
    host: "0.0.0.0",
}).then(() => {
    console.log("HTTP Server running!");
});

app.route({
    method: "GET",
    url: "/",
    handler: () => {
        return ;
    },
})