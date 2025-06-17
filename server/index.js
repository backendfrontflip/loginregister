// Description: This file sets up an Express server with CORS and MySQL connection.
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// Lets run the server on port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Let's create the database connection
const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: "",
  database: 'gatewisedb',
});

// Let's create a route to the server that will register a user
app.post('/register', (req, res) => {
  // We need to get the variables from the request body
  const { email, username, password } = req.body;
  // Let's create a query to insert the user into the database
  const query = 'INSERT INTO users (email, username, password) VALUES (?, ?, ?)';
  db.query(query, [email, username, password], (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'User registered successfully' });
  });
});