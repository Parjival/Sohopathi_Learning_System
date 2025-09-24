const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/storybook', authMiddleware, require('../controllers/storybookController').createStorybook);
router.post('/sign', authMiddleware, require('../controllers/signLangController').createSignVideo);
router.post('/audiobook', authMiddleware, require('../controllers/audiobookController').createAudiobook);
router.post('/live_caption', authMiddleware, require('../controllers/liveCaptionController').startLiveCaption);
router.post('/social_story', authMiddleware, require('../controllers/socialStoryController').createSocialStory);
router.post('/describe_image', authMiddleware, require('../controllers/describeImageController').describe);
router.post('/math', authMiddleware, require('../controllers/mathController').solve);
router.post('/emotion', authMiddleware, require('../controllers/emotionController').support);
router.post('/comm_board', authMiddleware, require('../controllers/commBoardController').create);

module.exports = router;
