# Um presente para você

Uma surpresa em forma de site: um presente para abrir, uma cartinha e uma pergunta especial. Feito com React, TypeScript e Vinext, com estilos e animações em CSS.

## Rodar localmente

Use Node.js 22.13 ou superior. Na pasta do projeto:

```sh
npx --yes pnpm@11.25.0 install --frozen-lockfile
npx --yes pnpm@11.25.0 dev
```

Abra http://localhost:5173. Para encerrar, use Ctrl+C no terminal.

## Personalizar

- `app/page.tsx`: mensagens, telas e interações. `LETTER` guarda os parágrafos da cartinha.
- `app/globals.css`: cores, espaçamento e animações.
- `app/layout.tsx`: título, descrição e idioma.
- `public/`: ícone e outros arquivos públicos.

O botão “Não” foge cinco vezes com o mouse e depois volta ao lugar. No toque, pelo teclado ou com redução de movimento ativada, aceita a resposta diretamente. As respostas só mudam a tela: não são armazenadas nem enviadas.

## Verificar e compilar

```sh
pnpm lint
pnpm typecheck
pnpm build
```

`pnpm start` abre a versão compilada localmente. A compilação usa Vite/Vinext e gera um Worker compatível com Cloudflare em `dist/`. As pastas `build/`, `scripts/` e a configuração de hospedagem fazem parte desse processo.

Os componentes de terceiros mantêm suas licenças originais. Alterações locais não são publicadas automaticamente.
