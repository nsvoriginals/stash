const jwt = require('jsonwebtoken');

// Define the payload
const payload = {
  userId: "74c1f0fd-5dca-4dc5-8159-621150462349"
};

// Define the secret key
const secretKey = "letsbecool";

// Generate the JWT token
const token = jwt.sign(payload, secretKey, { algorithm: 'HS256' });

console.log(token);
