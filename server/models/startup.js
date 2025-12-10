import mongoose from "mongoose";

const StartupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  sector: {
    type: String,
    required: true,
  },
  funding: {
    type: Number,
    default: 0,
  },
  companytype: {
    type: String,
    default: "Private Limited",
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },

  turnover: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0, 
  },
  comments: {
    type: [
      {
        user: { type: String, default: "Anonymous" },
        text: { type: String, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
    default: [],
  },

  description: {
    type: String,
    default: "",
  },
  website: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  phoneNumber: {
    type: String,
    default: "",
  },
  founder: {
    type: String,
    default: "",
  },
  imageUrl: {
    type: String,
    default: "",
  },
});

export default mongoose.model("Startup", StartupSchema);
