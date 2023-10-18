const jwt = require("jsonwebtoken");

const ValidarAdicionarProduto = (req, res, next) => {
	const { body } = req;
	if (
		body.nome === undefined ||
		body.valorAtual === undefined ||
		body.valorAntigo === undefined ||
		body.desconto === undefined ||
		body.tag === undefined ||
		body.cores === undefined ||
		body.estoqueNum === undefined ||
		body.valorFrete === undefined ||
		body.estrelas === undefined ||
		body.nome.trim() === "" ||
		body.valorAtual.trim() === "" ||
		body.valorAntigo.trim() === "" ||
		body.desconto.trim() === "" ||
		body.tag.trim() === "" ||
		body.cores === "" ||
		body.estoqueNum.trim() === "" ||
		body.valorFrete.trim() === "" ||
		body.estrelas.trim() === ""
	) {
		return res.status(400).json({ mensage: "Preencha todos os campos." });
	}

	next();
};
const authAdmin = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	jwt.verify(token, process.env.ADMIN_TOKEN, (err, user) => {
		if (err) {
			console.log(err);
			return res.status(403).json({ mensage: "token inválido" });
		} else {
			req.email = user;
			next();
		}
	});
};
module.exports = { ValidarAdicionarProduto, authAdmin };
