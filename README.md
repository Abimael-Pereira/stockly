# 🧩 Stockly

**Sistema completo para gerenciamento de estoque e vendas**, com dashboard interativa e visualização de dados.

## 🚀 Funcionalidades

- Cadastro e gerenciamento de produtos
- Registro de vendas
- Dashboard gráfica com estatísticas

## 🛠️ Tecnologias utilizadas

- **Next.js** – Framework React para SSR e SSG
- **Tailwind CSS** – Estilização moderna e responsiva
- **PostgreSQL** – Banco de dados relacional
- **Prisma ORM** – Acesso ao banco de dados com tipagem forte
- **Docker (em desenvolvimento)** – Para ambiente isolado e fácil deploy

## 💻 Instalação e uso local

```bash
# Clone o repositório
git clone https://github.com/Abimael-Pereira/stockly.git
cd stockly

# Instale as dependências
npm install

# Configure o .env utilizando o .env.example como referência

# Rode as migrations
npx prisma migrate dev

# Inicie o projeto
npm run dev
