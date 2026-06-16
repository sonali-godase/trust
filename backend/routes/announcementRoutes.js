const express = require("express");
const router = express.Router();
const announcementController = require("../controllers/announcementController");
const authMiddleware = require("../middleware/authMiddleware");
const checkPermission = require("../middleware/permissionMiddleware");

router.use(authMiddleware);

// Open endpoints for any authenticated user to receive notifications
router.get("/my-notifications", announcementController.getMyNotifications);
router.post("/:id/read", announcementController.markAsRead);
router.post("/:id/dismiss", announcementController.dismissNotification);

// Management endpoints
// checkPermission('Announcements') implies the user must have this module visible
// In Trustee portal, we'll let them view list even if 'View' only, but creation is restricted on frontend or via backend checks.
// Since the prompt says "Admin: Full access. Trust Members: View -> Can only view. Manage -> Can create... Branch Managers -> Can create only for their branch."
// We will apply the module permission middleware, but we need to ensure Branch Managers bypass it if they don't use 'checkPermission' identically. 
// However, 'checkPermission' in this codebase often just checks if Trustee has the module. Admin bypasses it. 
// What about BranchManagers? The permissionMiddleware usually bypasses for Admin/BranchManager.

router.get("/", checkPermission('Announcements'), announcementController.getAllAnnouncements);
router.post("/", checkPermission('Announcements'), announcementController.createAnnouncement);
router.put("/:id", checkPermission('Announcements'), announcementController.updateAnnouncement);
router.delete("/:id", checkPermission('Announcements'), announcementController.deleteAnnouncement);
router.get("/:id/analytics", checkPermission('Announcements'), announcementController.getAnalytics);

module.exports = router;
