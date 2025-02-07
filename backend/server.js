const express = require("express"); // para criar o servidor Node JS
const bodyParser = require("body-parser"); // para ler o corpo da requisição em formato JSON  
const cors = require("cors"); // para permitir que o front-end acesso o back-end
const { v4: uuidv4 } = require("uuid"); // para gerar o ID do formulario, que deve ser unico para cada formulario  

const app = express(); // cria uma instancia do express para o servidor

const PORT = 3333; // porta padrao do node

app.use(bodyParser.json()); // para ler o corpo da requisição em formato JSON 
app.use(cors()); // para permitir que o front-end acesso o back-end 

let dataStore = []; // armazena os dados da requisição  

// rota para salvar os dados no array dataStore 
app.post("/formulario/dados", (requisicao, resposta)=>{
    const data = {id: uuidv4(), ...requisicao.body}; // recebe os dados da requisição
    dataStore.push(data); // armazena os dados na variavel dataStore
    resposta.status(201).json({message: "Dados armazenados com sucesso!"}); // retorna uma mensagem de sucesso caso o cadastro seja bem sucedido
});

// rota para retornar todos os dados armazenados no array dataStore 
app.get("/formulario/dados", (requisicao, resposta)=>{
    resposta.status(200).json(dataStore); // retorna os dados armazenados no array dataStore
});

// rota para retornar os dados de um formulario especifico
app.get("/formulario/dados/:id", (requisicao, resposta)=>{
    const id = requisicao.params.id; // recebe o id do formulario
    const dados = dataStore.find(item => item.id === id); // procura o formulario no array dataStore
    resposta.status(200).json(dados); // retorna os dados do formulario
});

// rota para excluir um formulario especifico
app.delete("/formulario/dados/:id", (requisicao, resposta)=>{
    const id = requisicao.params.id; // recebe o id do formulario
    const index = dataStore.findIndex(item => item.id === id); // procura o formulario no array dataStore
    if (index !== -1) {
        dataStore.splice(index, 1); // remove o formulario do array dataStore
        resposta.status(204).end(); // retorna uma resposta vazia com status 204 (No Content)
    } else {
        resposta.status(404).json({message: "Formulario nao encontrado"}); // retorna uma mensagem de erro caso o formulario nao seja encontrado
    }
});

// rota para atualizar um formulario especifico
app.put("/formulario/dados/:id", (requisicao, resposta)=>{
    const id = requisicao.params.id; // recebe o id do formulario
    const index = dataStore.findIndex(item => item.id === id); // procura o formulario no array dataStore
    if (index !== -1) {
        dataStore[index] = requisicao.body; // atualiza os dados do formulario
        resposta.status(200).json({message: "Formulario atualizado com sucesso!"}); // retorna uma mensagem de sucesso caso o formulario seja atualizado
    } else {
        resposta.status(404).json({message: "Formulario nao encontrado"}); // retorna uma mensagem de erro caso o formulario nao seja encontrado
    }
});


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`); // informa o endereco do servidor na porta 3333
});
