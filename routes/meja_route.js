import express from 'express';
import {
	getAllMeja,
	getMejaById,
	createMeja,
	updateMeja,
	deleteMeja
} from "../controller/meja_controller.js";

const app = express();

app.use(express.json());

app.get('/', getAllMeja);
app.get('/:id', getMejaById);
app.get('/', createMeja);
app.get('/:id', updateMeja);
app.get('/:id', deleteMeja);

export default app;