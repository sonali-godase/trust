const express = require("express");
const router = express.Router();
const { getGalleryItems, createGalleryItem, updateGalleryItem, deleteGalleryItem } = require("../controllers/galleryController");
const upload = require("../middleware/uploadMiddleware");

router.get("/", getGalleryItems);
router.post("/", upload.single("mediaFile"), createGalleryItem);
router.put("/:id", upload.single("mediaFile"), updateGalleryItem);
router.delete("/:id", deleteGalleryItem);

module.exports = router;
