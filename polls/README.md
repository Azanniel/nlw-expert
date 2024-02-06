# NLW Expert (Node.js)

Um sistema de votação em tempo real em que os usuários podem criar uma enquete e outros usuários podem votar. O sistema gera uma classificação entre as opções e atualiza os votos em tempo real.

## 🔧 Requisitos

- Docker
- NodeJS
- PNPM

## 🔮 Como rodar localmente?

- Clone o projeto
- Instale as dependências com `pnpm install`
- Configure o banco de dados e o serviço Redis com `docker compose up -d`
- Execute a aplicação usando `pnpm run dev`