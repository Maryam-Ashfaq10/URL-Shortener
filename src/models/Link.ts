import mongoose, { Schema, models, model } from "mongoose";

const LinkSchema = new Schema(
  {
    originalUrl: {
      type: String,
      required: true,
    },

    shortCode: {
      type: String,
      required: true,
      unique: true,
    },

    clicks: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Link = models.Link || model("Link", LinkSchema);

export default Link;