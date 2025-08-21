const express = require('express');
const app = express();
const port = 3000;

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const userRoutes = require('./routes/userRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes'); // <-- import

app.use('/api/users', userRoutes);
app.use('/api/vehicles', vehicleRoutes); // <-- mount vehicles

// Root
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
