const router = require('express').Router();

const {
	getFonts,
	getFontById,
	updateFonts,
	insertFonts,
	deleteFontById,
	checkIfFontExists,
	getLatesId,
} = require('../controllers/fonts');

router.get('/get-fonts', getFonts, (req, res) => {
	console.log(res);
});

router.get('/get-font', getFontById, (req, res) => {
	console.log(res);
});

router.post('/update-font', updateFonts);
router.post('/delete-font', deleteFontById);
router.post('/insert-font', getLatesId, checkIfFontExists, insertFonts);

module.exports = router;
