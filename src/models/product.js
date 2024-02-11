import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: ["true", "please provide a product name"],
      trim: true,
      maxLength: [120, "product name should not be max then 120 hars"],
    },
    price: {
      type: Number,
      required: ["true", "please provide a product price"],
      trim: true,
      maxLength: [5, "product name should not be max then 5 chars"],
    },
    description: {
      type: String,
      required: ["true", "please provide a product discription"],
      trim: true,
      maxLength: [500, "product name should not be max then 500 chars"],
    },
    photo: [
      {
        secure_url: {
          type: String,
          required: true,
        },
      },
    ],
    stock: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
    },
  },
  { timestamps: true }
);
