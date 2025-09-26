# Projeto Final Angular I - Turma 1455

Este é um projeto desenvolvido como trabalho final para a disciplina de Angular III modulo II, Turma 1455. O objetivo é demonstrar conhecimentos em Angular, incluindo componentes, serviços, rotas, pipes, validações e gerenciamento de estado.

## 🛠️ Tecnologias e Serviços Utilizadas

- [Angular CLI 20.1.5](https://github.com/angular/angular-cli)
- [Fake Store API](https://fakestoreapi.com) (configuração na pasta `src/environments`)

## 🚀 Executar o Projeto

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Inicie o servidor de desenvolvimento:**
   ```bash
   ng serve
   ```
   Acesse `http://localhost:4200/` no navegador.

## 🗺️ Rotas Principais

- `/` — Página inicial (Home)
- `/product/:id` — Detalhes do produto
- `/checkout` — Página de checkout

## 📁 Estrutura de Pastas

```plaintext
src/
  app/
    components/
      cart-status/         # Exibe status do carrinho
      checkout-form/       # Formulário de checkout
      header/              # Cabeçalho da aplicação
      product-card/        # Card de produto individual
      products-list/       # Lista de produtos
      shopping-cart/       # Carrinho de compras
    environments/          # Configurações de ambiente
    models/
      interfaces/          # Interfaces TypeScript (ex: IProduct)
    pages/
      checkout/            # Página de checkout
      home/                # Página inicial
      product-details/     # Detalhes do produto
    pipes/                 # Pipes customizados (ex: currency-brl)
    services/              # Serviços (ex: ProductsService)
    shared/
      validators/          # Validadores customizados
    store/                 # Gerenciamento de estado (actions, reducer, state)
  assets/                  # Imagens e outros assets
  styles.scss              # Estilos globais
  index.html               # HTML principal
```

## 📚 Observações

- Para mais informações sobre comandos Angular CLI, consulte a [documentação oficial](https://angular.dev/tools/cli).

---


https://github.com/Kirink212/api-examples/tree/main

https://github.com/Kirink212/1455-caixaverso-angular-ii/tree/master
