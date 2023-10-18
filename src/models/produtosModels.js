const conexao = require("./connection");

const getAllProducts = async () => {
	const [produtos] = await conexao.connection.execute("SELECT * FROM produto");
	return produtos;
};
const CriarProdutos = async (produto) => {
	const create_time = new Date(Date.now()).toUTCString();
	const query =
		"INSERT INTO produto(nome, valorAtual,valorAntigo,desconto, cores,estoqueNum,valorFrete,estrelas,img1,img2,img3,img4,tag,create_time) VALUES (?, ?, ?,?,?,?,?,?,?,?,?,?,?,?)";
	const [produtoCriado] = await conexao.connection.execute(query, [
		produto.nome,
		produto.valorAtual,
		produto.valorAntigo,
		produto.desconto,
		produto.cores,
		produto.estoqueNum,
		produto.valorFrete,
		produto.estrelas,
		produto.img1,
		produto.img2,
		produto.img3,
		produto.img4,
		produto.tag,
		create_time,
	]);

	return { insertId: produtoCriado.insertId };
};
const DeletarProdutos = async (id) => {
	const [produto] = await conexao.connection.execute(
		"DELETE FROM produto WHERE id = ?",
		[id]
	);
	return produto;
};
const AtualizarProdutos = async (id, produto) => {
	const [dado] = await conexao.connection.execute("SELECT * FROM produto");
	const index = dado.findIndex((item) => item.id == id);
	const escolhido = dado[index];
	const nome = () => {
		if (produto.nome) {
			return produto.nome;
		}
		return escolhido.nome;
	};
	const valorAtual = () => {
		if (produto.valorAtual) {
			return produto.valorAtual;
		}
		return escolhido.valorAtual;
	};
	const cores = () => {
		if (produto.cores) {
			return produto.cores;
		}
		return escolhido.cores;
	};
	const estoqueNum = () => {
		if (produto.estoqueNum) {
			return produto.estoqueNum;
		}
		return escolhido.estoqueNum;
	};
	const valorFrete = () => {
		if (produto.valorFrete) {
			return produto.valorFrete;
		}
		return escolhido.valorFrete;
	};
	const estrelas = () => {
		if (produto.estrelas) {
			return produto.estrelas;
		}
		return escolhido.estrelas;
	};
	const img1 = () => {
		if (produto.img1) {
			return produto.img1;
		}
		return escolhido.img1;
	};
	const img2 = () => {
		if (produto.img2) {
			return produto.img2;
		}
		return escolhido.img2;
	};
	const img3 = () => {
		if (produto.img3) {
			return produto.img3;
		}
		return escolhido.img3;
	};
	const img4 = () => {
		if (produto.img4) {
			return produto.img4;
		}
		return escolhido.img4;
	};
	const tag = () => {
		if (produto.tag) {
			return produto.tag;
		}
		return escolhido.tag;
	};
	// falto u o valorAntigo e desconto
	const query =
		"UPDATE produto SET nome = ?, valorAtual = ?, cores = ?, estoqueNum = ?, valorFrete = ?, estrelas = ?, img1 = ?, img2 = ?, img3 = ?, img4 = ?, tag = ? WHERE id = ?";

	const [produtos] = await conexao.connection.execute(query, [
		nome(),
		valorAtual(),
		cores(),
		estoqueNum(),
		valorFrete(),
		estrelas(),
		img1(),
		img2(),
		img3(),
		img4(),
		tag(),
		id,
	]);
	return produtos;
};

module.exports = {
	getAllProducts,
	CriarProdutos,
	DeletarProdutos,
	AtualizarProdutos,
};
