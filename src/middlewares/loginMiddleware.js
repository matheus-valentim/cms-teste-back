const jwt = require("jsonwebtoken");
const undefinedFieldLogin = (req, res, next) => {
	const { body } = req;
	console.log(body.email, body.senha);
	if (
		body.email == undefined ||
		body.email.trim() == "" ||
		body.senha == undefined ||
		body.senha.trim() == ""
	) {
		return res
			.status(400)
			.json({ message: "Preencha todos os campos.", status: 400 });
	}
	next();
};
const undefinedFieldRegistrar = (req, res, next) => {
	const { body } = req;
	const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
	console.log(body.email, body.senha);
	if (
		body.email == undefined ||
		body.email.trim() == "" ||
		body.senha == undefined ||
		body.senha.trim() == ""
	) {
		return res
			.status(400)
			.json({ message: "Preencha todos os campos.", status: 400 });
	}
	if (!regex.test(body.email.trim())) {
		return res
			.status(400)
			.json({ message: "Esse email não é válido", status: 400 });
	}
	next();
};
const undefinedFildRecuperar = (req, res, next) => {
	const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
	const { body } = req;
	if (body.email == undefined || body.email.trim() == "") {
		return res
			.status(400)
			.json({ message: "Preencha todos os campos.", status: 400 });
	}
	if (!regex.test(body.email.trim())) {
		return res
			.status(400)
			.json({ message: "Esse email não é válido", status: 400 });
	}
	next();
};
const undefinedFilvalidar = (req, res, next) => {
	const { body } = req;
	console.log(body.email, body.senha);
	if (
		body.email == undefined ||
		body.email.trim() == "" ||
		body.senha == undefined ||
		body.senha.trim() == ""
	) {
		return res
			.status(400)
			.json({ message: "Preencha todos os campos.", status: 400 });
	}
	next();
};
const undefinedFildmudar = (req, res, next) => {
	const { body } = req;
	console.log(body.email, "foiiiiii");

	if (
		body.email == undefined ||
		body.email.trim() == "" ||
		body.senha1 == undefined ||
		body.senha1.trim() == "" ||
		body.senha2 == undefined ||
		body.senha2.trim() == ""
	) {
		return res
			.status(400)
			.json({ message: "Preencha todos os campos.", status: 400 });
	}
	next();
};
const authenticateToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) {
			console.log(err);
			return res.status(403).json({ message: "token inválido", status: 403 });
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
	undefinedFieldRegistrar,
};
