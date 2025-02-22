export class Project {
    constructor(data) {
        this.id = data.id;
        this.nome_projeto = data.nome_projeto;
        this.descricao_resumida = data.descricao_resumida;
        this.nome_responsavel = data.nome_responsavel;
        this.cargo_responsavel = data.cargo_responsavel;
        this.email_responsavel = data.email_responsavel;
        this.data_preenchimento = data.data_preenchimento;
        this.status = data.status;
        this.implementacao = data.implementacao;
        this.documentacao = data.documentacao;
        this.testes = data.testes;
        this.deploy = data.deploy;
        this.data_criacao = data.data_criacao || new Date();
        this.data_atualizacao = data.data_atualizacao;
    }

    validate() {
        if (!this.nome_projeto) throw new Error('Nome do projeto é obrigatório');
        if (!this.descricao_resumida) throw new Error('Descrição resumida é obrigatória');
        if (!this.nome_responsavel) throw new Error('Nome do responsável é obrigatório');
        if (!this.email_responsavel) throw new Error('Email do responsável é obrigatório');
    }
}