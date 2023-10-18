const jwt = require("jsonwebtoken");
const undefinedFieldLogin = (req, res, next) => {
	const { body } = req;
	if (
		body.email == undefined ||
		body.email.trim() == "" ||
		body.senha == undefined ||
		body.senha.trim() == ""
	) {
		return res.status(400).json({ mensage: "Preencha todos os campos." });
	}
	next();
};
const undefinedFildRecuperar = (req, res, next) => {
	const { body } = req;
	if (body.email == undefined || body.email.trim() == "") {
		return res.status(400).json({ mensage: "Preencha todos os campos." });
	}
	next();
};
const undefinedFilvalidar = (req, res, next) => {
	const { body } = req;
	if (
		body.email == undefined ||
		body.email.trim() == "" ||
		body.senha == undefined ||
		body.senha.trim() == ""
	) {
		return res.status(400).json({ mensage: "Preencha todos os campos." });
	}
	next();
};
const undefinedFildmudar = (req, res, next) => {
	const { body } = req;
	if (
		body.email == undefined ||
		body.email.trim() == "" ||
		body.senha1 == undefined ||
		body.senha1.trim() == "" ||
		body.senha2 == undefined ||
		body.senha2.trim() == ""
	) {
		return res.status(400).json({ mensage: "Preencha todos os campos." });
	}
	next();
};
const authenticateToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) {
			console.log(err);
			return res.status(403).json({ mensage: "token inválido" });
		} else {
			req.email = user;
			next();
		}
	});
};

module.exports = {
	undefinedFieldLogin,
	authenticateToken,
	undefinedFildRecuperar,
	undefinedFilvalidar,
	undefinedFildmudar,
};
