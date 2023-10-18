const produtosModel = require("../models/produtosModels");

const getAll = async (req, res) => {
	const produtos = await produtosModel.getAllProducts();
	return res.status(200).json(produtos);
};
const CriarProdutos = async (req, res) => {
	const produto = await produtosModel.CriarProdutos(req.body);
	return res.status(201).json(produto);
};
const DeletarProdutos = async (req, res) => {
	const { id } = req.params;
	await produtosModel.DeletarProdutos(id);
	return res.status(204).json();
};
const AtualizarProdutos = (req, res) => {
	const { id } = req.params;
	return res.status(204).json(produtosModel.AtualizarProdutos(id, req.body));
};
module.exports = {
	getAll,
	CriarProdutos,
	DeletarProdutos,
	AtualizarProdutos,
};
