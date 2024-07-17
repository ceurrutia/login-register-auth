import { request } from "express";
import Museum from "../models/museum.model.js";

export const getMuseums = async (req, res) => {
  const museums = await Museum.find({
    user: req.user.id
  });
  res.json(museums);
};

export const createMuseum = async (req, res) => {
  const {
    image,
    museumName,
    address,
    description,
    day_free,
    hour_free,
    city,
    country,
    how_go,
    
  } = req.body;
  console.log(req.user)
  const newMuseum = new Museum({
    image,
    museumName,
    address,
    description,
    day_free,
    hour_free,
    city,
    country,
    how_go,
    user: req.user.id
  });
  const saveMuseum = await newMuseum.save();
  res.json(saveMuseum);
};

export const getMuseum = async (req, res) => {
  const museum = await Museum.findById(request.params.id);
  if (!museum) return res.status(404).json({ message: "Museum not found " });
  res.json(museum);
};

export const deleteMuseum = async (req, res) => {
  const museum = await Museum.findByIdAndDelete(request.params.id);
  if (!museum) return res.status(404).json({ message: "Museum not found " });
  res.json(museum);
};

export const updateMuseum = async (req, res) => {
  const museum = await Museum.findByIdAndUpdate(request.params.id, req.body, {
    new: true,
  });
  if (!museum) return res.status(404).json({ message: "Museum not found " });
  res.json(museum);
};
