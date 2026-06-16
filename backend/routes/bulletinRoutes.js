const express = require("express");
const router = express.Router();
const { createBulletin, getBulletins, updateBulletin, deleteBulletin } = require("../controllers/bulletinController");
const authMiddleware = require("../middleware/authMiddleware");
const checkRole = require("../middleware/roleMiddleware");

// Public route to get active bulletins
router.get("/public", (req, res, next) => { req.query.activeOnly = 'true'; next(); }, getBulletins);

// Protected routes (Admin or Trustee can manage bulletins)
router.use(authMiddleware);

router.post("/", checkRole(["Trustee", "Admin"]), createBulletin);
router.get("/", checkRole(["Trustee", "Admin"]), getBulletins);
router.put("/:id", checkRole(["Trustee", "Admin"]), updateBulletin);
router.delete("/:id", checkRole(["Trustee", "Admin"]), deleteBulletin);

module.exports = router;
