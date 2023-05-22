const db = require('../db/db');

exports.getFonts = async (req, res) => {
	const selectFigures = 'SELECT * FROM fonts';

	db.query(selectFigures, async (err, result) => {
		if (err || result.length < 1) {
			console.log(err);
			return res.status(400).send({
				success: false,
				error: 'Fonts not found :(',
			});
		} else {
			return res.status(200).send({
				success: true,
				data: result,
			});
		}
	});
};

exports.getFontById = async (req, res) => {
	const { id } = req.query;
	console.log(id);
	const selectFigures = `SELECT * FROM fonts WHERE id = ${id}`;

	db.query(selectFigures, async (err, result) => {
		if (err || result.length < 1) {
			console.log(err);
			return res.status(400).send({
				success: false,
				error: 'Font not found :(',
			});
		} else {
			return res.status(200).send({
				success: true,
				data: result,
			});
		}
	});
};

exports.insertFonts = async (req, res) => {
	const { id } = req.body;
	const { name } = req.body;
	const { image } = req.body;
	const { image2 } = req.body;
	const { link } = req.body;

	const insertQuery = `INSERT INTO fonts (id, name, image, link) VALUES ("${id}", '${name}', '${image}', '${link}')`;

	db.query(insertQuery, (err, result) => {
		if (err) {
			return res.status(400).send({
				success: false,
				error: 'Cant insert font',
			});
		} else {
			return res.status(200).send({
				success: true,
				data: 'Success',
			});
		}
	});
};

exports.updateFonts = async (req, res) => {
	// Get id, name, image and link on frontend from existing font with that id
	// Then put that data in form to be edited
	const { id } = req.body;
	const { name } = req.body;
	const { image } = req.body;
	const { image2 } = req.body;
	const { link } = req.body;
	const { wide } = req.body;
	console.log(id);

	// Check if font exists

	const checkFont = `SELECT * FROM fonts WHERE id = ${id}`;

	db.query(checkFont, async (err, result) => {
		if (err || result.length < 1) {
			return res.status(400).send({
				success: false,
				error: 'Font not found :(',
			});
		} else {
			const updateFonts = `UPDATE fonts SET name="${name}", image="${image}", image2="${image2}", url="${link}", wide="${wide}" WHERE id=${id}`;

			db.query(updateFonts, async (err, result) => {
				if (err || result.length < 1) {
					console.log(err);
					console.log(result);
					return res.status(400).send({
						success: false,
						error: 'Update error :(',
					});
				} else {
					return res.status(200).send({
						success: true,
						message: `Font with id ${id} updated`,
					});
				}
			});
		}
	});
};
