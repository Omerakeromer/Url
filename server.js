const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/shorturl', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// URL Schema
const urlSchema = new mongoose.Schema({
  longUrl: String,
  shortUrl: String,
  urlCode: String,
});

const Url = mongoose.model('Url', urlSchema);

// API Routes
app.post('/api/shorten', async (req, res) => {
  const { longUrl } = req.body;

  const urlCode = shortid.generate();
  const shortUrl = `http://localhost:3000/${urlCode}`;

  const url = new Url({ longUrl, shortUrl, urlCode });
  await url.save();

  res.json({ shortUrl });
});

app.get('/:code', async (req, res) => {
  const url = await Url.findOne({ urlCode: req.params.code });
  if (url) {
    return res.redirect(url.longUrl);
  } else {
    return res.status(404).json('رابط غير موجود');
  }
});

// Start Server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});