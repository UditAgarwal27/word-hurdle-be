const { get_a_word, upload_csv } = require("./word.service");

module.exports = {
  get_a_word: async (req, res) => {
    try {
      const _response = await get_a_word();
      res.status(200).json(_response);
    } catch (err) {
      const _response = { msg: "Server errror in fetching the word" };
      return _response;
    }
  },

  upload_csv: async (req, res) => {
    try {
      const _response = await upload_csv();
      if (_response) {
        res.status(200).json("File successfully updated");
      } else {
        throw new Error("File upload failed");
      }
    } catch (err) {}
    const _response = { msg: err.message };
    res.status(500).json(_response);
  },
};
