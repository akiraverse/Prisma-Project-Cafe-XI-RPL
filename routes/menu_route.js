import express from 'express';
import {
	getAllMenu,
	getMenuById,
	createMenu,
	updateMenu,
	deleteMenu
} from "../controller/menu_controller.js";

const app = express();

app.use(express.json());

app.get('/', getAllMenu);
app.get('/:id', getMenuById);
app.get('/', createMenu);
app.get('/:id', updateMenu);
app.get('/:id', deleteMenu);

export default app;