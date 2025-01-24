import mongoose from "mongoose";

const SpecSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    ingredients: [{ type: String, required: true }],
    garnish: [{ type: String, required: false}],
    glassware: { type: String, required: false},
    imageUrl: { type: String, required: true},
    userOwner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true }
});

export const SpecModel = mongoose.model("specs", SpecSchema);