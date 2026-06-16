const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const checkPermission = require("../middleware/permissionMiddleware");

const uploadFields = upload.fields([
  { name: 'featuredImage', maxCount: 1 },
  { name: 'galleryImages', maxCount: 10 },
  { name: 'videoFile', maxCount: 1 }
]);

// USER ROUTES (Public)
router.get("/public", eventController.getPublishedEvents);
router.get("/public/featured", eventController.getFeaturedEvents);
router.get("/public/:slug", eventController.getEventBySlug);

// ADMIN ROUTES (Protected)
router.use("/admin", authMiddleware, checkPermission('Events'));

router.route("/admin")
  .get(eventController.getAllEventsAdmin)
  .post(uploadFields, eventController.createEvent);

router.route("/admin/:id")
  .get(eventController.getEventByIdAdmin)
  .put(uploadFields, eventController.updateEvent)
  .delete(eventController.deleteEvent);

router.patch("/admin/:id/publish", eventController.togglePublish);
router.patch("/admin/:id/feature", eventController.toggleFeatured);

module.exports = router;
