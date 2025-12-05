import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Caminho para o arquivo de texto
const formsFilePath = path.join(__dirname, 'formularios.txt');

// Garantir que o arquivo existe
if (!fs.existsSync(formsFilePath)) {
  fs.writeFileSync(formsFilePath, '=== FORMULÁRIOS ENVIADOS ===\n\n');
}

// Endpoint para salvar formulário
app.post('/save-form', (req, res) => {
  try {
    const { nome, email, telefone, idade, opiniao, satisfacao, newsletter, comentarios, timestamp } = req.body;

    if (!nome || !email) {
      return res.status(400).json({ error: 'Nome e Email são obrigatórios' });
    }

    // Formatar os dados do formulário
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString('pt-BR');

    let formText = `\n${'='.repeat(60)}\n`;
    formText += `Data/Hora: ${formattedDate}\n`;
    formText += `${'-'.repeat(60)}\n`;
    formText += `Nome: ${nome}\n`;
    formText += `Email: ${email}\n`;
    formText += `Telefone: ${telefone || 'Não informado'}\n`;
    formText += `Idade: ${idade || 'Não informado'}\n`;
    formText += `Opinião sobre o serviço: ${opiniao || 'Não respondido'}\n`;
    formText += `Nível de satisfação: ${satisfacao || 'Não respondido'}\n`;
    formText += `Newsletter: ${newsletter ? 'Sim' : 'Não'}\n`;
    formText += `Comentários: ${comentarios || 'Nenhum comentário'}\n`;
    formText += `${'='.repeat(60)}\n`;

    // Adicionar ao arquivo
    fs.appendFileSync(formsFilePath, formText, 'utf8');

    console.log(`Formulário salvo de: ${nome} (${email})`);
    res.json({
      success: true,
      message: 'Formulário salvo com sucesso!',
      data: {
        nome,
        email,
        timestamp: formattedDate,
      },
    });
  } catch (error) {
    console.error('Erro ao salvar formulário:', error);
    res.status(500).json({ error: 'Erro ao salvar formulário' });
  }
});

// Endpoint para listar todos os formulários
app.get('/forms', (req, res) => {
  try {
    const data = fs.readFileSync(formsFilePath, 'utf8');
    res.json({ content: data });
  } catch (error) {
    console.error('Erro ao ler formulários:', error);
    res.status(500).json({ error: 'Erro ao ler formulários' });
  }
});

// Endpoint para contar formulários
app.get('/forms/count', (req, res) => {
  try {
    const data = fs.readFileSync(formsFilePath, 'utf8');
    const count = (data.match(/Data\/Hora:/g) || []).length;
    res.json({ count });
  } catch (error) {
    console.error('Erro ao contar formulários:', error);
    res.status(500).json({ error: 'Erro ao contar formulários' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Arquivo de formulários: ${formsFilePath}`);
});
