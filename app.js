const express = require('express');

const {
  generateImage,
  generateMeta,
} = require('./controllers/openaiController');

const app = express();

// middleware

app.use(express.json());
app.use(express.static('public'))


// routes
app.post('/openai/meta', generateMeta)
app.post('/openai/image', generateImage)

app.listen(4000, () => console.log('listening for request on port 4000'));
