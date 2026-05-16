# Portfolio - Walisson Silva

Portfolio pessoal desenvolvido com HTML, CSS e JavaScript puro.

## Estrutura

- `index.html`: conteudo principal do portfolio.
- `style.css`: estilos, responsividade, tema claro/escuro e animacoes.
- `script.js`: copia de email, alternancia de tema e animacoes ao rolar.
- `programming.jpg`: imagem de fundo.
- `github.png`, `insta.png`, `linkedin.png`, `gmail.png`: icones usados no site.

## Como abrir localmente

Abra o arquivo `index.html` diretamente no navegador.

Tambem e possivel usar a extensao Live Server do VS Code.

## Deploy no GitHub Pages

1. Crie um repositorio no GitHub.
2. Envie todos os arquivos deste projeto para a branch `main`.
3. No GitHub, entre em `Settings`.
4. Acesse `Pages`.
5. Em `Build and deployment`, selecione:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
6. Salve e aguarde o GitHub gerar o link.

O arquivo `.nojekyll` ja foi adicionado para evitar processamento desnecessario do GitHub Pages.

## Deploy na Vercel

1. Entre em https://vercel.com.
2. Clique em `Add New Project`.
3. Importe o repositorio do GitHub.
4. Mantenha as configuracoes padrao.
5. Clique em `Deploy`.

Como o projeto e estatico, nao precisa de comando de build.

## Deploy na Netlify

1. Entre em https://netlify.com.
2. Clique em `Add new site`.
3. Escolha `Import an existing project`.
4. Importe o repositorio do GitHub.
5. Use estas configuracoes:
   - Build command: deixe vazio.
   - Publish directory: `.`
6. Clique em `Deploy`.

O arquivo `netlify.toml` ja deixa o diretorio de publicacao configurado.

## Depois de publicar

Atualize links futuros quando tiver dominio proprio, principalmente:

- Link principal do portfolio em redes sociais.
- Link do projeto Caminho Diario quando sair do dominio temporario do Lovable.
- Descricao do perfil do GitHub e LinkedIn.
