const mongoose = require("mongoose");

const prasadRequestSchema = new mongoose.Schema({
  devoteeName: { type: String, required: true },
  address: { type: String, required: true },
  status: { type: String, default: "Pending" }
}, { timestamps: true });

module.exports = mongoose.model("PrasadRequest", prasadRequestSchema);
