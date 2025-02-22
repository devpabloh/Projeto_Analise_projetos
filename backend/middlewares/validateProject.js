export const validateProject = (req, res, next) => {
    const { 
        informacoes_gerais,
        status_desenvolvimento,
        tecnologias_utilizadas,
        metodologia,
        testes_qualidade,
        ambiente_implementacao,
        documentacao,
        equipe_suporte
    } = req.body;

    // Validação de informações gerais
    if (!informacoes_gerais) {
        return res.status(400).json({
            success: false,
            error: 'Informações gerais são obrigatórias'
        });
    }

    // Validação de campos obrigatórios
    const requiredFields = {
        'nome_projeto': 'Nome do projeto',
        'descricao_resumida': 'Descrição resumida',
        'data_preenchimento': 'Data de preenchimento'
    };

    for (const [field, label] of Object.entries(requiredFields)) {
        if (!informacoes_gerais[field]?.toString().trim()) {
            return res.status(400).json({
                success: false,
                error: `${label} é obrigatório`
            });
        }
    }

    // Validação do responsável
    if (!informacoes_gerais.responsavel?.nome?.trim()) {
        return res.status(400).json({
            success: false,
            error: 'Nome do responsável é obrigatório'
        });
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (informacoes_gerais.responsavel?.email && 
        !emailRegex.test(informacoes_gerais.responsavel.email)) {
        return res.status(400).json({
            success: false,
            error: 'Email do responsável inválido'
        });
    }

    // Validação de datas
    if (status_desenvolvimento) {
        const { data_inicial, data_final } = status_desenvolvimento;
        if (data_inicial && data_final) {
            const dataInicial = new Date(data_inicial);
            const dataFinal = new Date(data_final);
            
            if (dataFinal < dataInicial) {
                return res.status(400).json({
                    success: false,
                    error: 'Data final não pode ser anterior à data inicial'
                });
            }
        }
    }

    // Validação de campos booleanos
    const booleanFields = [
        'passou_por_testes',
        'deploy_automatizado',
        'deploy_estruturado',
        'implementado',
        'rollback_automatico',
        'possui_documentacao',
        'documentacao_atualizada',
        'suporte_disponivel'
    ];

    // Conversão e validação de campos booleanos
    booleanFields.forEach(field => {
        const sections = {
            passou_por_testes: 'testes_qualidade',
            deploy_automatizado: 'ambiente_implementacao',
            deploy_estruturado: 'ambiente_implementacao',
            implementado: 'ambiente_implementacao',
            rollback_automatico: 'ambiente_implementacao',
            possui_documentacao: 'documentacao',
            documentacao_atualizada: 'documentacao',
            suporte_disponivel: 'equipe_suporte'
        };

        const section = req.body[sections[field]];
        if (section && field in section && typeof section[field] !== 'boolean') {
            section[field] = Boolean(section[field]);
        }
    });

    // Validação de arrays
    if (documentacao?.tipos_documentos && !Array.isArray(documentacao.tipos_documentos)) {
        return res.status(400).json({
            success: false,
            error: 'Tipos de documentos deve ser um array'
        });
    }

    // Validação de status
    const statusValidos = ['Em Desenvolvimento', 'Concluído', 'Em Pausa', 'Cancelado'];
    if (status_desenvolvimento?.status_atual && 
        !statusValidos.includes(status_desenvolvimento.status_atual)) {
        return res.status(400).json({
            success: false,
            error: 'Status de desenvolvimento inválido'
        });
    }

    // Validação de horário de suporte
    if (equipe_suporte?.horario_suporte) {
        const horarioRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9] às ([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!horarioRegex.test(equipe_suporte.horario_suporte)) {
            return res.status(400).json({
                success: false,
                error: 'Formato de horário inválido. Use o formato HH:MM às HH:MM'
            });
        }
    }

    next();
};