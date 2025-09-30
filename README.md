# Projeto Final Angular III - Modulo II - Turma 1455

Este é um projeto desenvolvido como trabalho final para a disciplina de Angular III modulo II, Turma 1455. O objetivo é demonstrar conhecimentos em Angular, incluindo componentes, serviços, rotas, pipes, validações e gerenciamento de estado.

## 🚀 Executar o Projeto

### Requisitos para execução:

Possuir os seguintes itens instalados na maquina:

1. [Node.js | Versão: ^20](https://nodejs.org/pt/download)

2. [Angular CLI | Versão: 20](https://angular.dev/)

3. [NPM](https://www.npmjs.com/package/npm?activeTab=versions)
 
---
 
### Iniciando a Aplicação Automaticamente:

Para iniciar tanto o projeto frontend quando a api backend, basta executar o arquivo `init-setup-all.bat`.  

Acesse a aplicação em qualquer navegador via Url  `http://localhost:4200`.
 
Na pasta do projeto estão os arquivos `.bat` onde possuem o fluxo de de instalação das dependencias e inicialização das aplicações

1. `init-setup-all.bat` | Executa o frontend e a api backend

2. `init-setup-frontend.bat` | Executa apenas o frontend

3. `init-setup-backend.bat` | Executa apenas a api backend
 
---
 
### Iniciando a Aplicação Manualmente: 

#### Frontend
Na pasta do projeto:

1. Instale as dependências com `npm install` via cmd.

2. Inicie o a aplicação com `npm start` via cmd.

3. Acesse a aplicação frontend em qualquer navegador via Url  `http://localhost:4200`.

#### Backend
Navegar ate a pasta `/movies-api` na pasta do projeto:

1. Dentro da pasta, tambem instale as dependências com `npm install` via cmd.

2. Inicie o a aplicação com `npm start` via cmd.

3. A Api Backend é executada no endereço  `http://localhost:3000`.

---

## 🙍‍♂️ Credenciais
É possivel cadastrar novos usuarios de acesso no banco em `http://localhost:4200/register`

Para realizar o login, já existe um usuario pre-cadastrado no banco de dados.
- Email: `admin@email.com`
- Senha: `123` 

---

## ⚙️ Configurações
As configurações do projeto e da api estão nos arquivos `app/environments` e `movies-api/config.js`

---

## 🗺️ Rotas Principais

- `/`                → Página inicial (Home)
- `/home`            → Redireciona para Página inicial
- `/login`           → Página de login
- `/register`        → Página de registro
- `/movie/new`       → Cadastro de novo filme (protegida por AuthGuard)
- `/movie/edit/:id`  → Edição de filme (protegida por AuthGuard)
- `/checkout`        → Página de checkout (protegida por AuthGuard)

---

## 📁 Estrutura de Pastas

```plaintext
src/
  app/
    components/
      cart-status/         # Exibe status do carrinho
      checkout-form/       # Formulário de checkout
      header/              # Cabeçalho da aplicação
      movie-card/          # Card de filme individual
      movies-list/         # Lista de filmes
      shopping-cart/       # Carrinho de compras
    environments/          # Configurações de ambiente
    guards/                # Guardas
    models/
      interfaces/          # Interfaces TypeScript (ex: Movie)
    pages/
      checkout/            # Página de checkout
      home/                # Página inicial
      new-movie/           # Cadastro/Edição de filme
      login/               # Página de login
      register/            # Página de registro
    pipes/                 # Pipes customizados
    services/              # Serviços (ex: MoviesService)
    shared/
      validators/          # Validadores customizados
    store/                 # Gerenciamento de estado (actions, reducer, state)
    utils/                 # Interceptadores
    index.html             # HTML principal
    styles.scss            # Estilos globais
```
---

## 📚 Observações

- Para mais informações sobre comandos Angular CLI, consulte a [documentação oficial](https://angular.dev/tools/cli).

---
## Complementos:

Movies Api:
https://github.com/Kirink212/api-examples/tree/main

Projeto Exemplo:
https://github.com/Kirink212/1455-caixaverso-angular-ii/tree/master
