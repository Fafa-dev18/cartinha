# Um presente para você

Um presente para abrir, uma cartinha e uma mensagem de carinho ao fechá-la. Feito com React, TypeScript e CSS, usando Vite.

## Rodar no VS Code

Use Node.js 24 LTS. Abra no VS Code a pasta que contém este `package.json`.

Na primeira vez, habilite o Yarn e instale as dependências:

```sh
corepack enable
yarn install
```

Para testar:

```sh
yarn dev
```

Abra o endereço mostrado no terminal (normalmente **http://127.0.0.1:5173/**). As alterações aparecem automaticamente. Para encerrar, pressione `Ctrl+C`.

O projeto usa Yarn 1.22.22, definido em `package.json`. Mantenha o `yarn.lock` no repositório para instalações consistentes.

## Personalizar

- `src/App.tsx`: telas, mensagens e interações. O texto da carta fica em `LETTER`.
- `src/styles.css`: cores, espaçamentos e animações.
- `index.html`: título, descrição e idioma.
- `public/favicon.svg`: ícone do site.

O fluxo é presente → cartinha → mensagem de carinho. Ao fechar a cartinha, aparece: “Obrigado por ser você. Você é muito importante pra mim. Eu adoro você. Beijo.” O cabeçalho permite recomeçar. Nenhuma resposta é coletada.

## Verificar e compilar

```sh
yarn validate
yarn build
yarn preview
```

`validate` executa ESLint e TypeScript. `build` gera o site estático em `dist/`. `preview` serve esse build localmente, normalmente em **http://127.0.0.1:4173/**.

O site não precisa de banco de dados, variáveis de ambiente ou servidor Node.js em produção. Para publicar, use o conteúdo de `dist/` em uma hospedagem estática. Os caminhos relativos permitem hospedar em uma subpasta.

## Subir no GitHub

Use esta pasta como raiz do repositório: `package.json`, `src/` e `.github/` devem ficar diretamente nela. Se houver duas pastas com o mesmo nome, abra a interna.

O `.gitignore` exclui dependências, builds, logs, arquivos locais do editor e segredos. Inclua `yarn.lock`, `.nvmrc`, `.gitignore` e `.github/` no envio.

Se a pasta ainda não estiver em um repositório:

```sh
git init -b main
git add .
git commit -m "Adiciona presente e cartinha"
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git push -u main
```

Se já houver um repositório, use o existente. O GitHub Actions verifica o projeto no Windows e no Linux a cada push ou pull request. Enviar o código ao GitHub não publica o site automaticamente.
