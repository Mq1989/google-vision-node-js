const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const JSONFileName = './video-extension-429405-359feff83b7f.json'
console.log('JSONFileName', JSONFileName)
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient({
  keyFilename: JSONFileName
});

app.use(cors(

));

app.use(express.json({ limit: '250mb' })); 

app.post('/api/image-text', async (req, res) => {
    const { url } = req.body;
    console.log('url', url);

    // Extract base64 content from Data URL
    const base64Image = url.split(';base64,').pop();

    try {
        // Call the Google Cloud Vision API with the base64-encoded image content
        const [result] = await client.textDetection({
            image: { content: base64Image }
        });
        console.log(result);

        // Process the result as needed and send a response back to the frontend
        res.json(result);
    } catch (error) {
        console.error('Error calling the Vision API', error);
        res.status(500).json({ error: 'Error processing image' });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
})