require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define the Request model
const requestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  companyName: String,
  plotId: String,
  plotNumber: String,
  location: String,
  ownerName: String,
  issueType: String,
  description: String,
  contactMethod: { type: String, default: 'email' },
});

const Request = mongoose.model('Request', requestSchema);

// Define the POST route for form submission
app.post('/api/requests', async (req, res) => {
  try {
    console.log('Request body:', req.body);

    const newRequest = new Request(req.body);
    await newRequest.save();
    console.log('Request saved successfully');

    res.status(200).json({ message: 'Request submitted successfully!' });
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({ message: 'An error occurred while submitting the request.' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
