const express = require("express");
const router = express();
const { get_a_word, upload_csv } = require("./word.controller");

router.post("/get-a-word", get_a_word);

router.post('/upload-csv', upload_csv);

module.exports = router;
