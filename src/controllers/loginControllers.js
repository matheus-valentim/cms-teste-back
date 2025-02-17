const loginModel = require("../models/loginModel");

const login = async (req, res) => {
	const user = await loginModel.loginModel(req.body);
	if (user == undefined) {
		return res
			.status(400)
			.json({ message: "Esse email não existe.", status: 400 });
	}
	if (user) {
		return res.status(200).json({
			messagem: "Login feito com sucesso.",
			acessToken: user.acessToken,
			refreshToken: user.refreshToken,
			status: 200,
		});
	}
	return res.status(400).json({ message: "Senha incorreta.", status: 400 });
};

const loginAdmin = async (req, res) => {
	const user = await loginModel.loginAdminModel(req.body);
	if (user == undefined) {
		return res
			.status(400)
			.json({ message: "Esse email não existe.", status: 400 });
	}
	if (user) {
		console.log(user);
		return res.status(200).json({
			message: "Login feito com sucesso.",
			adminToken: user.adminToken,
			refreshToken: user.refreshToken,
			status: 200,
		});
	}
	return res.status(400).json({ message: "Senha incorreta.", status: 400 });
};
const registrarUser = async (req, res) => {
	const user = await loginModel.registrarUser(req.body);
	if (user) {
		return res.status(201).json({ message: "Usuário registrado." });
	} else {
		return res
			.status(400)
			.json({ message: "Esse email já existe.", status: 400 });
	}
};
const recuperarSenha = async (req, res) => {
	const recuperado = await loginModel.recuperarSenha(req.body);
	console.log(recuperado);
	if (recuperado) {
		return res.status(201).json({ message: "tudo ok", status: 201 });
	}

	return res
		.status(400)
		.json({ message: "esse email não existe", status: 400 });
};
const validarSenha = async (req, res) => {
	const senha = await loginModel.validarSenha(req.body);

	if (senha) {
		console.log(senha);
		return res
			.status(201)
			.setHeader("Authorization", `Bearer ${senha}`)
			.json({ message: senha, status: 201 });
	}
	return res.status(400).json({ message: "O código não bate", status: 400 });
};
const mudarSenha = async (req, res) => {
	const senha = await loginModel.mudarSenha(req.body);
	if (senha) {
		return res.status(201).json({ message: "tudo okk", status: 201 });
	}
	if (senha == undefined) {
		return res
			.status(400)
			.json({ message: "esse email não existe", status: 400 });
	}
	return res.status(400).json({ message: "as senhas não batem", status: 400 });
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
