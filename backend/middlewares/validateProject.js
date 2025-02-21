export const validateProject = (req, res, next) => {
  const { 
      nome_projeto, 
      descricao_resumida, 
      data_preenchimento,
      responsavel_nome,
      responsavel_email 
  } = req.body;

  // Required fields validation
  const requiredFields = {
      nome_projeto: 'Nome do projeto',
      descricao_resumida: 'Descrição resumida',
      data_preenchimento: 'Data de preenchimento',
      responsavel_nome: 'Nome do responsável'
  };

  for (const [field, label] of Object.entries(requiredFields)) {
      if (!req.body[field]?.toString().trim()) {
          return res.status(400).json({
              success: false,
              error: `${label} é obrigatório`
          });
      }
  }

  // Email validation
  if (responsavel_email && !responsavel_email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({
          success: false,
          error: 'Email do responsável inválido'
      });
  }

  // Boolean fields validation
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

  booleanFields.forEach(field => {
      if (field in req.body && typeof req.body[field] !== 'boolean') {
          req.body[field] = Boolean(req.body[field]);
      }
  });

  next();
};