const express = require("express");
const router = express.Router();
const devoteeController = require("../controllers/devoteeController");
const authMiddleware = require("../middleware/authMiddleware");
const checkPermission = require("../middleware/permissionMiddleware");

router.use(authMiddleware);
router.use(checkPermission('Devotees'));

router.route("/")
  .get(devoteeController.getAllDevotees)
  .post(devoteeController.createDevotee);

router.route("/:id")
  .put(devoteeController.updateDevotee)
  .delete(devoteeController.deleteDevotee);

module.exports = router;
