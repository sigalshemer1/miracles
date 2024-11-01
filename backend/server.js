import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
//import connectDB from './config/db.js';
import imageRoutes from './routes/imageRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());

app.use(cors({ origin: 'http://localhost:5173' })); // Adjust if frontend is hosted elsewhere

//connectDB();

app.use('/api', imageRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
