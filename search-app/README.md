# Search App - Aplicação de Pesquisa estilo Google

Aplicação web React com Vite que simula um formulário de pesquisa do Google e salva as pesquisas em um arquivo de texto.

## 🚀 Funcionalidades

- Interface visual similar ao Google
- Formulário de pesquisa com input arredondado
- Salvamento de pesquisas em arquivo TXT
- Exibição do histórico das últimas 5 pesquisas
- Botão "Estou com sorte" que abre pesquisa real no Google

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## 🔧 Instalação

As dependências já foram instaladas. Caso precise reinstalar:

```bash
npm install
```

## ▶️ Como Executar

### 1. Iniciar o servidor backend (em um terminal):

```bash
npm run server
```

O servidor rodará em `http://localhost:3001`

### 2. Iniciar o frontend React (em outro terminal):

```bash
npm run dev
```

A aplicação rodará em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
search-app/
├── src/
│   ├── App.jsx          # Componente principal com formulário
│   ├── App.css          # Estilos da aplicação
│   ├── index.css        # Estilos globais
│   └── main.jsx         # Ponto de entrada React
├── server/
│   ├── server.js        # Servidor Express
│   └── searches.txt     # Arquivo onde as pesquisas são salvas
├── package.json
└── vite.config.js
```

## 💾 Armazenamento

As pesquisas são salvas no arquivo `server/searches.txt` no formato:

```
[05/12/2025, 14:30:15] minha pesquisa
[05/12/2025, 14:31:20] outra pesquisa
```

## 🎨 Tecnologias Utilizadas

- **Frontend:**
  - React 19
  - Vite 7
  - CSS3

- **Backend:**
  - Node.js
  - Express 4
  - CORS

## 📝 API Endpoints

### POST /save-search
Salva uma nova pesquisa no arquivo txt

**Body:**
```json
{
  "query": "texto da pesquisa",
  "timestamp": "2025-12-05T14:30:15.000Z"
}
```

### GET /searches
Retorna todas as pesquisas salvas

**Response:**
```json
{
  "searches": [
    "[05/12/2025, 14:30:15] minha pesquisa"
  ]
}
```

## 🤝 Contribuições

Sinta-se à vontade para contribuir com melhorias!

## 📄 Licença

Este projeto é livre para uso pessoal e educacional.
