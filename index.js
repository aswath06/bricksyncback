const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const userRoutes = require('./routes/userRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const productRoutes = require('./routes/productRoutes');

app.use('/api/users', userRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/products', productRoutes);

// Root
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
