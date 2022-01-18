<h1 align="center">Aram Pog</h1>

<p align="center">
  <a href="./CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" /></a>
  <a href="https://github.com/Thream/socketio-jwt/actions/workflows/build.yml"><img src="https://github.com/Thream/socketio-jwt/actions/workflows/build.yml/badge.svg?branch=develop" /></a>
  <a href="https://conventionalcommits.org"><img src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg" alt="Conventional Commits" /></a>
</p>

## ⚙️ Configuração
```
    Crie um banco de dados Postgres e configure no arquivo ormconfig.json
```
```
    Crie um arquivo de variáveis de ambiente .env
```
```
    Configure a variável JWT_SECRET_KEY com uma 
    string secreta para a utilização do JWT.
```
```
    Configure a variável BOT_TOKEN com o token
    do bot para o Discord.
```

## 💾 Instalando dependências

```
Rode o comando: yarn
```

## ⚙️ Iniciando
```
  Para a primeira inicialização, rode as migrations utilizando:
  yarn typeorm migration:run
```
```
Para iniciar o servidor em desenvolvimento rode o comando: yarn dev
```