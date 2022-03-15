const csv_to_json = require("csvtojson");
const multer = require("multer");
const fs = require("fs");
const { models } = require("../../model");

const upload = multer({ dest: "../../uploads/" }).single("wordsCSV");

module.exports = {
  get_a_word: async () => {
    const todays_date = new Date().getDate();
    try {
      const record = await models.word.findOne();
      const words = record.words;
      const word_object = words[todays_date - 1];
      const _response = { word: word_object };
      return _response;
    } catch (err) {
      console.log(err);
      const _response = { msg: "Server errror in fetching the word" };
      return _response;
    }
  },

  //upload csv file to database;
  upload_csv: async () => {
    upload(req, res, (err) => {
      if (err) {
        res.status(400).json({ err: err });
      }
      csv_to_json()
        .fromFile(req.file.path)
        .then(async (csv_data) => {
          await models.word.deleteOne();
          const new_words = new models.word({
            words: csv_data,
          });
          await new_words.save();
          fs.unlinkSync(req.file.path);
          return true;
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
    });
  },
};
