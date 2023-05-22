const router = require('express').Router();

const {
	getFonts,
	getFontById,
	updateFonts,
	insertFonts,
} = require('../controllers/fonts');

router.get('/get-fonts', getFonts, (req, res) => {
	console.log(res);
});

router.get('/get-font', getFontById, (req, res) => {
	console.log(res);
});

router.post('/update-font', updateFonts);
router.post('/insert-font', insertFonts);

module.exports = router;
