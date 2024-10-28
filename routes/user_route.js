import express from 'express';
import {
	getAllUser,
	getUserById,
	createUser,
	updateUser,
	deleteUser
} from "../controller/user_controller.js";

const app = express();

app.use(express.json());

app.get('/', getAllUser);
app.get('/:id', getUserById);
app.get('/', createUser);
app.get('/:id', updateUser);
app.get('/:id', deleteUser);

export default app;