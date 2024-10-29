// CRUD
// getAllUser
// getUserById
// createUser
// updateUser
// deleteUser

import { PrismaClient } from "@prisma/client";
import md5 from "md5";

const prisma = new PrismaClient();

export const getAllUser = async(req,res) => {
	try {
		const response = await prisma.user.findMany()
		res.status(200).json(response)
	} catch (error) {
		console.log(error)
		res.status(500).json({msg: erorr})
	}
}

export const getUserById = async(req,res) => {
	try {
		const result = await prisma.user.findUnique({
			where:{
				id_user: Number(req.params.id)
			}
		})
		res.status(200).json(result)
	} catch (error) {
		console.log(error)
		res.status(500).json({msg: erorr})
	}
}

export const createUser = async(req,res) => {
	try {
		const {nama, username, password} = req.body
		const result = await prisma.user.create({
			data: {
				nama: nama,
				username: username,
				password: md5(password),
			}
		})
		res.status(200).json({
			success: true,
			data: result
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({msg: erorr})
	}
}

export const updateUser = async(req,res) => {
	try {
		const {nama,username,password} = req.body
		const result = await prisma.user.update({
			where: {
				id_user: parseInt(req.params.id)
			},
			data: {
				nama: nama,
				username: username,
				password: md5(password),
			},
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

export const deleteUser = async(req,res) => {
	try {
		const result = await prisma.user.delete({
			where: {
				id_user: Number(req.params.id)
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

