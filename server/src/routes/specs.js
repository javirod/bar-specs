import express from "express";
import mongoose from "mongoose";
import { SpecModel } from "../models/Specs.js";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const response = await SpecModel.find({});
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

router.post("/", async (req, res) => {
    const spec = new SpecModel(req.body);
    try {
        const response = await spec.save();
        res.json(spec);
    } catch (err) {
        res.json(err);
    }
});

router.put("/", async (req, res) => {
    
    {userId, specId} 
    try {
        const spec = await SpecModel.findById(req.body.specId);
        const user = await UserModel.findById(req.body.userId);
        user.savedSpecs.push(spec);
        await user.save();
        res.json({ savedSpecs: user.savedSpecs });
    } catch (err) {
        res.json(err);
    }
});

router.get("/savedSpecs/ids", async (req,res) => {
    try {
        const user = await UserModel.findById(req.body.userId);
        res.json({ savedSpecs: user?.savedSpecs});
    } catch(err) {
        res.json(err);
    }
});

router.get("/savedSpecs", async (req,res) => {
    try {
        const user = await UserModel.findById(req.body.userId);
        const savedSpecs = await SpecModel.find({_id: { $in: user.savedSpecs },});
        res.json({ savedSpecs });
    } catch(err) {
        res.json(err);
    }
});



export { router as specsRouter}
