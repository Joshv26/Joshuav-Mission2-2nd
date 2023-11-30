const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');




//This data is in your notes or on azure
const port = process.env.PORT || 3000; // Port number
const endpoint = 'https://joshmission2-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/1b8c8f8b-d481-4a1a-a37b-a0806cb84496/detect/iterations/Car%20Testing/image';
const apiKey = 'de4d339f1cf447b6a8a78971e2874396'; // API key

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/predict', async (req, res) => {
  try {
    const imageUrl = req.body.image;

    const response = await axios.post(endpoint, {
      Url: imageUrl,
    }, {
      headers: {
        'Prediction-Key': apiKey,
        'Content-Type': 'application/json',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
