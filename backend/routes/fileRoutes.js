const express = require('express');
const { getFileContent } = require('../controllers/fileController');

const router = express.Router();

router.get('/:filename', getFileContent);

module.exports = router;
