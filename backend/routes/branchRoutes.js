const express = require("express");
const router = express.Router();
const branchController = require("../controllers/branchController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const checkPermission = require("../middleware/permissionMiddleware");

// Public route to get all branches (can be used by users, document admins, etc.)
router.get("/", branchController.getBranches);

// Protected routes (Admin and Trustees with 'Branches' manage permission)
router.post("/", authMiddleware, checkPermission('Branches'), upload.single('image'), branchController.createBranch);
router.put("/:id", authMiddleware, checkPermission('Branches'), upload.single('image'), branchController.updateBranch);
router.delete("/:id", authMiddleware, checkPermission('Branches'), branchController.deleteBranch);

module.exports = router;
