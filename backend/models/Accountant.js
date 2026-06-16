const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const accountantSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  joiningDate: { type: Date, required: true },
  password: { type: String, required: true },
  profilePhoto: { type: String, default: "" },
  createdByTrusteeId: { type: mongoose.Schema.Types.ObjectId, ref: "Trustee", required: true },
  emailVerified: { type: Boolean, default: false },
  accountStatus: { type: String, enum: ["active", "inactive"], default: "active" },
  role: { type: String, default: "Accountant" }
}, { timestamps: true });

accountantSchema.pre("save", async function() {
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

accountantSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Accountant", accountantSchema);
