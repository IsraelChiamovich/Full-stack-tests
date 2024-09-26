import express, { Express } from "express";
import cors from "cors"
import beeperRoutes from './routes/beeperRoutes';
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use('/api/beepers', beeperRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
