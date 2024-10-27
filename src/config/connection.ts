import { app } from "./app";

export const connection = app.register(require("@fastify/mysql"), {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "foodhotel",
});