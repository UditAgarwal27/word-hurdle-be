const router = require("express").Router();
const wordsModel = require("../Models/word");

const csvtojson = require('csvtojson')
const multer = require('multer');
const upload = multer({ dest: "uploads/" }).single("wordsCSV");
const fs = require('fs');

router.post("/getAWord", async (req, res) => {

	const todaysDate = new Date().getDate();
	await wordsModel.findOne()
	.then(record => {
		const words = record.words;
		const wordObject = words[todaysDate - 1];
		return res.status(200).json({ word: wordObject });
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({ msg: "Server errror in fetching the word" });
	})
});


//upload csv file to database;
router.post('/uploadCSV', (req, res) => {
	upload(req, res, (err) => {
		if (err) {
			res.status(400).json({ err: err });
		}
		csvtojson()
		.fromFile(req.file.path)
		.then(async (csvData) => {
			await wordsModel.deleteOne();
			const newwords = new wordsModel({
				words: csvData
			})
			await newwords.save();
			fs.unlinkSync(req.file.path);
			res.status(200).json("File successfully updated");
		})
	})
})

module.exports = router;
