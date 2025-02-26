import mongoose from "mongoose";

const SpecSchema = new mongoose.Schema({
    producer: { type: String, required: true, unique: false },
    vintage: { bsonType: int, required: true },
    varietal: [{ type: String, required: false}],
    appellation: { type: String, required: false},
    tasteProfile: [{ type: String, required: true}],
    aromas: [{ type: String, required: true}],
    abv: { bsonType: double, required: true},
    userOwner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true }

   // Vintage
   // Varietal (grape)
   // Region/Appellation 
   // Alcohol content
   // Taste profile/flavors
   // Aromas

});

export const SpecModel = mongoose.model("specs", SpecSchema);