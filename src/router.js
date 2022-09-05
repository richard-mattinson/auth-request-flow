const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const mockUser = {
    username: 'authguy',
    password: 'mypassword',
    profile: {
        firstName: 'Chris',
        lastName: 'Wolstenholme',
        age: 43
    }
};

const secretKey = "mySuperSecretKey";

// to test this use Insomnia these 

// - open a new post request
// - in json body request username and password
// - this will return a 'newToken' object
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === mockUser.username && password === mockUser.password) {
      const newToken = jwt.sign(username, secretKey);
      return res.json({ newToken });
    } 
      return res.status(404).json({ error: `Login failed, user not found` });
});

// - open a new get request
// - in header type "Authorization" then paste the provide newToken from the login request
router.get('/profile', (req, res) => {
  const createdToken = req.get("Authorization")
  try {
    jwt.verify(createdToken, secretKey)
    res.json({profile: mockUser.profile})
  } catch (err) {
    res.status(401).json({ error: `Authorization failed` });
  }
});


module.exports = router;
