import { RoomController } from "@/controllers/RoomController";
import { FastifyInstance } from "fastify";

export const roomRoutes = (app: FastifyInstance) => {
  app.get("/rooms", RoomController.getRooms);
  app.post("/rooms/:roomId/checkout", RoomController.checkout);
}