import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const CreateTransaction = async(req,res) => {
	let { id_user, id_meja, id_menu, nama_pelanggan, status = 'pending' } = req.body;

	const [getUserId, getMejaId, getMenuId] = await Promise.all([
		prisma.user.findUnique({ where: {id_user: Number(id_user) }}),
		prisma.meja.findUnique({ where: {id_meja: Number(id_meja) }}),
		prisma.menu.findUnique({ where: {id_menu: Number(id_menu) }})
	]);

	if (getUserId && getMejaId && getMenuId) {
		try {

			const result = await prisma.transaksi.create({
				data: {
					nama_pelanggan: nama_pelanggan,
					user: {
						connect: {
							id_user: Number(id_user)
						}
					},
					meja: {
						connect: {
							id_meja: Number(id_meja)
						}
					},
					tgl_transaksi: new Date(),
					status: status
				}
			});

			if (result) {
				const createDetail = await prisma.detail_Transaksi.create({
					data: {
						transaksi: {
							connect: {
								id_transaksi: result.transaksi,
							}
						},
						menu: {
							connect: {
								id_menu: Number(id_menu)
							}
						},
						harga: getMenuId.harga
					}
				});
				res.status(200).json({
					success: true,
					transaksi: result,
					detail: createDetail
				});
			} else {
				res.status(400).json({ msg: 'transaksi gagal' });
			}

		} catch (error) {
			console.log(error)
			res.status(500).json({ msg: error })
		}
	} else {
		res.status(404).json({ msg: 'pilih user, meja dan menu yang tersedia yaa!' })
	}
}