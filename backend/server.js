const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const ProjetoController = require('./controllers/ProjetoController');
const InformacoesGerais = require('./models/20250208121051_create_informacoes_gerais');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Rotas
app.post('/api/projetos', ProjetoController.create);
app.get('/api/projetos', async (req, res) => {
    try {
        const projetos = await InformacoesGerais.getAll();
        res.json(projetos);
    } catch (error) {
        console.error('Erro ao buscar projetos:', error);
        res.status(500).json({ error: 'Erro ao buscar projetos' });
    }
});

const PORT = 3333;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});