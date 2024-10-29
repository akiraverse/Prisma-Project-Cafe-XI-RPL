import {PrismaClient} from '@prisma/client';
import multer from 'multer';

// konfigurasi untuk menyimpan file
const storage = multer.diskStorage({
	destination: (_req, _file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (_req, file, cb) => {
		cb(null, Date.now() + "_" + file.originalname);
	}
})

// buat instance multer
export const upload = multer({ storage: storage });

const prisma = new PrismaClient();

export const getAllMenu = async(req,res) => {
	try {
		const response = await prisma.menu.findMany()
		res.status(200).json(response)
	} catch (error) {
		console.log(error)
		res.status(500).json({msg: error})
	}
}

export const getMenuById = async(req,res) => {
	try {
		const result = await prisma.menu.findUnique({
			where: {
				id_menu: Number(req.params.id)
			}
		})
		res.status(200).json(result)
	} catch (error) {
		console.log(error)
		res.status(500).json({msg: error})
	}
}

export const createMenu = async(req,res) => {
	try {
		const {nama_menu, jenis, deskripsi, gambar, harga} = req.body
		const result = await prisma.meja.create({
			data: {
				nama_menu: nama_menu,
				jenis: jenis,
				deskripsi: deskripsi,
				gambar: gambar,
				harga: Number(harga)
			}
		})
		res.status(200).json({
			success: true,
			data: result,
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({msg: error})
	}
}

export const updateMenu = async(req,res) => {
	try {
		const {nama_menu, deskripsi, harga} = req.body
		const result = await prisma.meja.update({
			where: {
				id_menu: parseInt(req.params.id)
			},
			data: {
				nama_menu: nama_menu,
				deskripsi: deskripsi,
				harga: Number(harga)
			}
		})
		res.status(200).json({
			success: true,
			data: result
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({msg: error})
	}
}

export const deleteMenu = async(req,res) => {
	try {
		const result = await prisma.meja.delete({
			where: {
				id_menu: Number(req.params.id)
			}
		})
		res.status(200).json({
			success: true,
			data: result
		})
	} catch (error) {
		console.log(error)
		res.status(200).json({msg: error})
	}
}