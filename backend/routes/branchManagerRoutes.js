const express = require("express");
const router = express.Router();
const branchManagerController = require("../controllers/branchManagerController");
const authMiddleware = require("../middleware/authMiddleware");
const checkRole = require("../middleware/roleMiddleware");

// All routes require 'BranchManager' role
router.use(authMiddleware, checkRole("BranchManager"));

router.get("/stats", branchManagerController.getStats);
router.get("/donations", branchManagerController.getBranchDonations);
router.get("/events", branchManagerController.getBranchEvents);
router.get("/documents", branchManagerController.getBranchDocuments);

module.exports = router;
