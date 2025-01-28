const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const catalogRoutes = require('./routes/catalogRoutes');
const customerRoutes = require('./routes/customerRoutes');
const port = 3000;

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', catalogRoutes);
app.use('/api', customerRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});