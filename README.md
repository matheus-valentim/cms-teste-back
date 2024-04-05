# cms-teste-back

> Esse é o backend de um e-commerce de roupa e o dashboard por trás do e-commerce, foi feito com NodeJs, docker e MySQL, ultilizei conceitos como autorização, encriptação, autenticação e etc.

### Ajustes e melhorias

O projeto ainda está em desenvolvimento, mas no momento estou focando no front end.

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

* Você instalou a versão mais recente do `docker e a imagem mysql do docker`
* Você instalou a versão mais recente do `postman ou insomnia`


## campos .env
- PORT= porta do servidor
- MYSQL_HOST= host do mysql
- MYSQL_USER= nome de usuario do mysql
- MYSQL_PASSWORD= senha do mysql
- MYSQL_DB= nome da tabela do mysql
- ACCESS_TOKEN_SECRET= secret jwt
- REFRESH_TOKEN= token jwt 1
- ADMIN_TOKEN= token jwt 2
- REFRESH_ADMIN_TOKEN= token jwt 3
- SMTP_HOST= host do provedor de email
- SMTP_PORT= porta do provedor de email
- SMTP_USER= email 
- SMTP_PASSWORD= senha do email

para o email recomendo usar o elasticemail.

## 🚀 Instalando <cms-teste-back>

Para instalar o <cms-teste-back>, siga estas etapas:

```
- npm install
- docker run --name BiscoitoMais -e MYSQL_ROOT_PASSWORD=[senha do banco] -p 3306:3306 -d mysql
caso tenha baixado a extensão "dabatase client" clique no icone que diz "database" na esquerda e depois no + la em cima
coloque o nome do banco (BiscoitoMais),e a senha que voce usou no MYSQL_ROOT_PASSWORD e aperte connect
```

## ☕ Usando cms-teste-back

Para usar cms-teste-back, siga estas etapas:

```
<exemplo_de_uso>
```

 

## 📝 Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](LICENSE) para mais detalhes.
