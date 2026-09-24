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

O repositório atual tem o aplicativo na subpasta `um-presente-para-voce/`. Abra essa subpasta no VS Code para rodar os comandos Yarn. Os workflows ficam em `.github/workflows/` na raiz do repositório, uma pasta acima do aplicativo.

O `.gitignore` exclui dependências, builds, logs, arquivos locais do editor e segredos. Inclua `yarn.lock`, `.nvmrc`, `.gitignore` e os workflows da raiz no envio.

Para enviar as alterações ao repositório existente, execute a partir da pasta do aplicativo:

```sh
cd ..
git add .
git commit -m "Configura publicação no GitHub Pages"
git push origin main
```

## Publicar no GitHub Pages

1. No repositório do GitHub, abra **Settings → Pages**.
2. Em **Build and deployment → Source**, selecione **GitHub Actions**.
3. Envie as alterações para `main`, incluindo `.github/workflows/deploy.yml` na raiz do repositório.
4. Na aba **Actions**, aguarde o workflow **Publicar site** concluir. Também é possível iniciá-lo em **Run workflow**.

O workflow instala as dependências, verifica o código, compila e publica o conteúdo de `um-presente-para-voce/dist`. Não envie a pasta `dist` manualmente e não use **Deploy from a branch** com o código-fonte: o Pages precisa dos arquivos compilados.

Endereço do site: **https://fafa-dev18.github.io/um-presente-para-voce/**. Use o endereço completo, incluindo o nome do repositório e a barra final.

O workflow de pull requests verifica o projeto no Windows e no Linux. Se reorganizar o aplicativo para a raiz do repositório, ajuste `working-directory`, `node-version-file` e o caminho do artefato nos workflows.
