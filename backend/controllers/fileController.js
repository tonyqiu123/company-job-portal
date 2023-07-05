const fs = require('fs');
const path = require('path');

exports.getFileContent = async (req, res) => {
    const fileName = req.params.filename;
    const filePath = path.join(__dirname, '..', 'files', fileName);

    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Error reading file" });
        }
    });
};
