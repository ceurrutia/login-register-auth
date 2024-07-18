import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getMuseums,
  getMuseum,
  createMuseum,
  updateMuseum,
  deleteMuseum,
} from "../controllers/museum.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createMuseumSchema } from "../schemas/museum.schema.js";

const router = Router();

router.get("/museums",  getMuseums);

router.get("/museum/:id", authRequired, getMuseum);

router.post(
  "/museum",
  authRequired,
  validateSchema(createMuseumSchema),
  createMuseum
);

router.delete("/museum/:id", authRequired, deleteMuseum);

router.put("/museum/:id", authRequired, updateMuseum);

export default router;
