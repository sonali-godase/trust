const express = require("express");
const router = express.Router();
const { getAuditLogs } = require("../controllers/auditController");
const authMiddleware = require("../middleware/authMiddleware");
const checkRole = require("../middleware/roleMiddleware");

router.use(authMiddleware);

// Audit logs are visible to Admin and Trustee
router.get("/", checkRole(["Admin", "Trustee"]), getAuditLogs);

module.exports = router;
