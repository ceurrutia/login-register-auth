import mongoose from "mongoose";

const museumSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
        trim: true,
    },
    museumName: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    day_free: {
        type: String,
        required: true,
        trim: true,
    },
    hour_free: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    country: {
        type: String,
        required: true,
        trim: true,
    },
    how_go: {
        type: String,
        required: true,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }

}, 
{
    timestamps: true
});

export default mongoose.model('Museum', museumSchema)
