import express from 'express';
import dotenv from 'dotenv';
import router from './routes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(router);
const port = process.env.PORT || 3000;

// On Vercel the exported app is served as a function; listen only when running locally.
if (!process.env.VERCEL) {
   app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
   });
}

export default app;
