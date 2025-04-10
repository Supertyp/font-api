const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use('/fonts', express.static(path.join(__dirname, 'fonts')));

// Dynamic font responder
app.get('/api/cryptofont/:num', (req, res) => {
  const inputNumber = parseInt(req.params.num, 10);
  if (isNaN(inputNumber)) {
    return res.status(400).send('Invalid number');
  }

  const calculatedNumber = inputNumber * 2;
  const fontFile = `${calculatedNumber}.ttf`;
  const fontPath = path.join(__dirname, 'fonts', fontFile);

  // Check if the file exists
  fs.access(fontPath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('Font not found');
    }
    res.sendFile(fontPath);
  });
});

app.listen(PORT, () => {
  console.log(`Font API running at http://localhost:${PORT}`);
});
