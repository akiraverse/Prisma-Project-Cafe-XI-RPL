import dotenv from 'dotenv';
import express from 'express';
import userRoute from '../backend/routes/user_route.js';
import mejaRoute from '../backend/routes/meja_route.js';
import menuRoute from '../backend/routes/menu_route.js';
import transaksiRoute from '../backend/routes/transaksi_route.js';

const app = express();

dotenv.config();
app.use(express.json());

app.use('/user', userRoute);
app.use('/meja', mejaRoute);
app.use('/menu', menuRoute);
app.use('/transaksi', transaksiRoute);


app.listen(process.env.APP_PORT, () => {
	console.log(`server running on port ${process.env.APP_PORT}`);
});