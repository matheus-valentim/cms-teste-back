const express = require("express");
const produtosController = require("./controllers/produtosControllers");
const produtosModel = require("./models/produtosModels");
const Validar = require("./middlewares/produtosMiddleware");
const login = require("./controllers/loginControllers");
const undefinedFieldLogin = require("./middlewares/loginMiddleware");
const { loginModel } = require("./models/loginModel");
const router = express.Router();

router.post("/login", undefinedFieldLogin.undefinedFieldLogin, login.login);

router.post(
	"/loginadmin",
	undefinedFieldLogin.undefinedFieldLogin,
	login.loginAdmin
);

router.post(
	"/registrar",
	undefinedFieldLogin.undefinedFieldRegistrar,
	login.registrarUser
);

router.get("/retornarProdutos", produtosController.getAll);

router.post(
	"/adicionarProdutos",
	Validar.ValidarAdicionarProduto,
	Validar.authAdmin,
	produtosController.CriarProdutos
);

router.post("/teste", undefinedFieldLogin.authenticateToken, (req, res) => {
	const teste = req.headers.authorization;
	res.status(200).json({ msg: teste });
});

router.post(
	"/recuperarSenha",
	undefinedFieldLogin.undefinedFildRecuperar,
	login.recuperarSenha
);

router.get("/", (req, res) => {
	res.status(200).send(require("crypto").randomBytes(64).toString("hex"));
});

router.post(
	"/validarSenha",
	undefinedFieldLogin.undefinedFilvalidar,
	login.validarSenha
);

router.post(
	"/mudarSenha",
	undefinedFieldLogin.authenticateToken,
	undefinedFieldLogin.undefinedFildmudar,
	login.mudarSenha
);
router.post("/token", login.retornarToken);

router.post("/tokenadmin", login.retornarAdminToken);

router.put(
	"/atualizarProdutos/:id",
	Validar.authAdmin,
	produtosController.AtualizarProdutos
);

router.delete(
	"/deletarProdutos/:id",
	Validar.authAdmin,
	produtosController.DeletarProdutos
);

module.exports = router;
