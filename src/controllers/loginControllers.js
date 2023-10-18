const loginModel = require("../models/loginModel");

const login = async (req, res) => {
	const user = await loginModel.loginModel(req.body);
	if (user == undefined) {
		return res.status(400).json({ message: "Esse email não existe." });
	}
	if (user) {
		return res.status(200).json({
			messagem: "Login feito com sucesso.",
			acessToken: user.acessToken,
			refreshToken: user.refreshToken,
		});
	}
	return res.status(400).json({ messagem: "Senha incorreta." });
};

const loginAdmin = async (req, res) => {
	const user = await loginModel.loginAdminModel(req.body);
	if (user == undefined) {
		return res.status(400).json({ message: "Esse email não existe." });
	}
	if (user) {
		console.log(user);
		return res.status(200).json({
			messagem: "Login feito com sucesso.",
			adminToken: user.adminToken,
			refreshToken: user.refreshToken,
		});
	}
	return res.status(400).json({ messagem: "Senha incorreta." });
};
const registrarUser = async (req, res) => {
	const user = await loginModel.registrarUser(req.body);
	if (user) {
		return res.status(201).json({ message: "Usuário registrado." });
	} else {
		return res.status(400).json({ message: "Esse email já existe." });
	}
};
const recuperarSenha = async (req, res) => {
	const recuperado = await loginModel.recuperarSenha(req.body);
	if (recuperado) {
		return res.status(201).json({ mensage: "tudo ok" });
	}
	return res.status(400).json({ mensage: "esse email não existe" });
};
const validarSenha = async (req, res) => {
	const senha = await loginModel.validarSenha(req.body);
	return res.status(201).json({ mensage: senha });
};
const mudarSenha = async (req, res) => {
	const senha = await loginModel.mudarSenha(req.body);
	if (senha) {
		return res.status(201).json({ mensage: "tudo okk" });
	}
	if (senha == undefined) {
		return res.status(400).json({ mensage: "esse email não existe" });
	}
	return res.status(400).json({ mensage: "as senhas não batem" });
};
const retornarToken = async (req, res) => {
	const token = await loginModel.returnToken(req.body);
	if (token == undefined) {
		console.log(undefined);
		return res.status(401).json({ mensage: "token inexistente" });
	}
	if (!token) {
		console.log("falso");
		return res.status(401).json({ mensage: "token inexistente" });
	}
	console.log("foi");
	return res.status(200).json({
		messagem: "token atualizado",
		acessToken: token.acessToken,
		refreshToken: token.refreshToken,
	});
};

const retornarAdminToken = async (req, res) => {
	const token = await loginModel.returnAdminToken(req.body);
	if (token == undefined) {
		console.log(undefined);
		return res.status(401).json({ mensage: "token inexistente" });
	}
	if (!token) {
		console.log("falso");
		return res.status(401).json({ mensage: "token inexistente" });
	}
	console.log("foi");
	return res.status(200).json({
		messagem: "token atualizado",
		adminToken: token.adminToken,
		refreshToken: token.refreshToken,
	});
};
module.exports = {
	login,
	registrarUser,
	recuperarSenha,
	validarSenha,
	mudarSenha,
	retornarToken,
	loginAdmin,
	retornarAdminToken,
};
