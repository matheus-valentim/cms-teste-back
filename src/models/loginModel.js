const conexao = require("./connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const nodemailer = require("nodemailer");

const loginModel = async (user) => {
	const [hash] = await conexao.connection.execute("SELECT * FROM user");
	const acharUser = hash.find((pessoa) => pessoa.email === user.email);
	console.log(acharUser);
	if (acharUser == undefined) {
		return undefined;
	}

	const resultado = await bcrypt.compare(user.senha, acharUser.senha);
	if (!resultado) {
		return false;
	}
	const acessToken = await atualizarToken(acharUser.email);
	const refreshToken = jwt.sign(acharUser.email, process.env.REFRESH_TOKEN);
	user.refreshToken = refreshToken;
	return { refreshToken, acessToken };
};
const loginAdminModel = async (user) => {
	console.log("chamou");
	const [hash] = await conexao.connection.execute("SELECT * FROM useradmin");
	const acharUser = hash.find((pessoa) => pessoa.email === user.email);
	if (acharUser == undefined) {
		return undefined;
	}
	const resultado = await bcrypt.compare(
		user.senha,
		hash[acharUser.id - 1].senha
	);
	if (!resultado) {
		return false;
	}

	const adminToken = await atualizarTokenAdmin(acharUser.email);
	const refreshToken = jwt.sign(
		acharUser.email,
		process.env.REFRESH_ADMIN_TOKEN
	);
	user.refreshToken = refreshToken;
	return { refreshToken, adminToken };
};
const registrarUser = async (user) => {
	const [users] = await conexao.connection.execute("SELECT * FROM user");
	const acharUser = users.find((pessoa) => pessoa.email === user.email);

	if (acharUser == undefined) {
		const senha = await bcrypt.hash(user.senha, 10);
		const query = "INSERT INTO user(email,senha) VALUES (?, ?)";
		const userNovo = await conexao.connection.execute(query, [
			user.email,
			senha,
		]);
		return true;
	}
	return false;
};
const recuperarSenha = async (email) => {
	const [users] = await conexao.connection.execute("SELECT * FROM user");
	const acharUser = users.find((pessoa) => pessoa.email === email.email);
	console.log(acharUser);
	if (!acharUser) {
		return false;
	}
	const transporter = nodemailer.createTransport({
		host: process.env.SMTP_HOST,
		port: process.env.SMTP_PORT,
		auth: {
			// TODO: replace `user` and `pass` values from <https://forwardemail.net>
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASSWORD,
		},
	});
	console.log(gerarNumero);
	const teste = await transporter.sendMail({
		from: "matheus <matheusfarias33322@gmail.com>",
		to: `<${email.email}>`,
		subject: "email",
		text: "funcionou????",
		html: `<p>o seu código é:</p> <strong>${gerarNumero}</strong/`,
	});
	try {
		await teste;
	} catch (err) {
		console.log(err);
	}

	return true;
};
const validarSenha = async (emailInfo) => {
	if (gerarNumero == emailInfo.senha) {
		console.log("foi");
		console.log(emailInfo);
		const auth = jwt.sign(emailInfo.email, process.env.ACCESS_TOKEN_SECRET);
		return auth;
	}
	console.log(emailInfo);
	console.log(gerarNumero, emailInfo.senha);
	return false;
};
const mudarSenha = async (info) => {
	if (info.senha1 == info.senha2) {
		console.log(info.email, "info");
		const senha = await bcrypt.hash(info.senha1, 10);
		console.log(senha);
		const [hash] = await conexao.connection.execute(
			`UPDATE user SET senha = '${senha}' WHERE email = '${info.email}'`
		);
		if (hash.affectedRows == 0) {
			return undefined;
		}
		return true;
	} else {
		return false;
	}
};
const atualizarToken = async (user) => {
	console.log(user);
	return jwt.sign({ user: user }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "15s",
	});
};
const atualizarTokenAdmin = async (user) => {
	console.log(user);
	return jwt.sign({ user: user }, process.env.ADMIN_TOKEN, {
		expiresIn: "15s",
	});
};
const returnAdminToken = async (token) => {
	if (
		token.adminToken == null ||
		token.adminToken == undefined ||
		token.adminToken == ""
	) {
		return undefined;
	}

	const novoToken = jwt.verify(
		token.refreshToken,
		process.env.REFRESH_ADMIN_TOKEN,
		(err, user) => {
			if (err) console.log(err);
			else return true;
		}
	);

	if (novoToken) {
		const adminToken = await atualizarTokenAdmin(token.email);
		return { adminToken: adminToken, refreshToken: token.refreshToken };
	}
};
const returnToken = async (token) => {
	if (
		token.acessToken == null ||
		token.acessToken == undefined ||
		token.acessToken == ""
	) {
		return undefined;
	}

	const novoToken = jwt.verify(
		token.refreshToken,
		process.env.REFRESH_TOKEN,
		(err, user) => {
			if (err) return false;
			else return true;
		}
	);

	if (novoToken) {
		const tokenAcesso = await atualizarToken(token.email);
		return { acessToken: tokenAcesso, refreshToken: token.refreshToken };
	}
};

const gerarNumero = Math.floor(Math.random() * (9999 - 1000) + 0);
module.exports = {
	loginModel,
	loginAdminModel,
	registrarUser,
	recuperarSenha,
	validarSenha,
	mudarSenha,
	returnToken,
	atualizarTokenAdmin,
	returnAdminToken,
};
