require('dotenv').config()
const express = require('express');
const cors = require('cors');

const carsRoutes = require('./routes/carsRoutes')
const scrapeRoutes = require('./routes/scrapeRoutes')

// express app
const app = express();

// middleware
app.use(cors({
  origin: process.env.ORIGIN
}))
app.options('*', cors())
app.use(express.json());

// routes
app.use('/api/cars', carsRoutes)
app.use('/api/scrape', scrapeRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});