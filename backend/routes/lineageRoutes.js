const express = require('express');
const router = express.Router();
const lineageController = require('../controllers/lineageController');
const upload = require('../middleware/uploadMiddleware');

// Public route
router.get('/public', lineageController.getPublicMembers);

// Admin/Trustee routes
router.get('/', lineageController.getAllMembers);

router.post('/', upload.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'galleryImages', maxCount: 10 },
  { name: 'documents', maxCount: 10 }
]), lineageController.createMember);

router.put('/:id', upload.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'galleryImages', maxCount: 10 },
  { name: 'documents', maxCount: 10 }
]), lineageController.updateMember);

router.delete('/:id', lineageController.deleteMember);
router.patch('/:id/status', lineageController.updateStatus);

module.exports = router;
