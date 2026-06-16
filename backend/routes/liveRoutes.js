const express = require('express');
const router = express.Router();
const { getCurrentLiveStream, getLiveStreamsHistory, createLiveStream, updateLiveStream, deleteLiveStream } = require('../controllers/liveController');
const { validateLiveStream } = require('../middleware/validationMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/current', getCurrentLiveStream);
router.get('/history', getLiveStreamsHistory);
router.post('/', upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'videoFile', maxCount: 1 }]), validateLiveStream, createLiveStream);
router.put('/:id', upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'videoFile', maxCount: 1 }]), validateLiveStream, updateLiveStream);
router.delete('/:id', deleteLiveStream);

module.exports = router;
